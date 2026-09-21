FROM node:20-alpine

# Install build and runtime dependencies
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git netcat-openbsd

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy application source
COPY . .

# Build Strapi admin panel and compile TypeScript
RUN npm run build

# Make entrypoint executable
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 1337

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "develop"]
