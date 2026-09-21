FROM node:22-alpine

# Install network utilities
RUN apk add --no-cache netcat-openbsd wget git

WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Make entrypoint executable
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 4321

ENV HOST=0.0.0.0
ENV PORT=4321
ENV STRAPI_URL=http://strapi:1337
ENV PUBLIC_STRAPI_URL=http://localhost:1337

ENTRYPOINT ["./docker-entrypoint.sh"]
