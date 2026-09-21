#!/bin/sh
set -e

echo "==> Sazilo Store Astro Frontend Docker Entrypoint"
echo "==> Waiting for Strapi at ${STRAPI_HOST:-strapi}:${STRAPI_PORT:-1337}..."

while ! nc -z ${STRAPI_HOST:-strapi} ${STRAPI_PORT:-1337}; do
  echo "Waiting for Strapi API to be reachable..."
  sleep 3
done

# Wait for Strapi API endpoint to return 200 OK
until wget -q -O - http://${STRAPI_HOST:-strapi}:${STRAPI_PORT:-1337}/api/articles > /dev/null 2>&1; do
  echo "Waiting for Strapi API to respond with published articles..."
  sleep 3
done

echo "==> Strapi is live! Building static routes..."
npm run build

echo "==> Starting Astro web server on port 4321..."
exec npx astro preview --host 0.0.0.0 --port 4321
