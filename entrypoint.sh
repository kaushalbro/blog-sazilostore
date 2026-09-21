#!/bin/bash
set -e

echo "========================================================"
echo " Starting Sazilo Store All-in-One Container"
echo " (MySQL + Strapi CMS + Astro Frontend in 1 Container)"
echo "========================================================"

# 1. Initialize MariaDB data directory if empty
if [ ! -d "/var/lib/mysql/mysql" ]; then
  echo "==> Initializing MariaDB data directory..."
  mysql_install_db --user=mysql --datadir=/var/lib/mysql > /dev/null 2>&1
fi

# 2. Start MariaDB temporarily to configure and import blog.sql
echo "==> Starting local database engine for setup..."
/usr/bin/mysqld_safe --datadir=/var/lib/mysql --skip-networking > /dev/null 2>&1 &
PID=$!

for i in {1..30}; do
  if mysqladmin ping --silent; then
    break
  fi
  sleep 1
done

echo "==> Configuring database user & permissions..."
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '@root123'; FLUSH PRIVILEGES;" 2>/dev/null || true
mysql -u root -p@root123 -e "CREATE DATABASE IF NOT EXISTS blog;"

# Check if tables exist
TABLE_COUNT=$(mysql -u root -p@root123 -s -N -e "SELECT count(*) FROM information_schema.tables WHERE table_schema='blog' AND table_name='articles';" 2>/dev/null || echo 0)

if [ "$TABLE_COUNT" = "0" ] || [ "$FORCE_IMPORT" = "true" ]; then
  echo "==> Importing all 103 Sazilo Store articles & media mappings from blog.sql..."
  mysql -u root -p@root123 blog < /app/init-db.sql
  echo "==> Database imported successfully with all 103 articles!"
else
  echo "==> Existing Sazilo database detected. Retaining persistent data."
fi

# Shutdown temp mysqld
mysqladmin -u root -p@root123 shutdown 2>/dev/null || kill -9 $PID 2>/dev/null || true
sleep 2

# 3. Ensure uploads directory is populated with all WebP images
echo "==> Syncing WebP media assets to Strapi public upload directory..."
mkdir -p /app/blog-cms/public/uploads
if [ -d "/app/blog-cms/data/uploads" ]; then
  cp -r /app/blog-cms/data/uploads/* /app/blog-cms/public/uploads/ 2>/dev/null || true
fi

echo "==> Starting all services via Supervisord..."
exec /usr/bin/supervisord -c /app/supervisord.conf
