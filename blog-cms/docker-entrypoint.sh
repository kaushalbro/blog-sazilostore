#!/bin/sh
set -e

echo "==> Sazilo Store Strapi CMS Docker Entrypoint"
echo "==> Waiting for database at ${DATABASE_HOST}:${DATABASE_PORT}..."

# Wait for MySQL to become available
while ! nc -z ${DATABASE_HOST} ${DATABASE_PORT}; do
  echo "Waiting for MySQL database connection..."
  sleep 2
done

echo "==> Database connection established!"

# Check and seed Sazilo data if requested or on first initialization
if [ "${AUTO_SEED:-true}" = "true" ]; then
  echo "==> Running Sazilo Store database seeder..."
  node ./scripts/seed-sazilo.js || echo "Seeder finished or already initialized."
fi

echo "==> Starting Strapi Application..."
exec "$@"
