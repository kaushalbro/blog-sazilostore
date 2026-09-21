FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install MariaDB, Supervisor, and dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    mariadb-server \
    mariadb-client \
    supervisor \
    netcat-openbsd \
    curl \
    git \
    build-essential \
    python3 \
    libvips-dev \
    ca-certificates \
    && npm install -g serve \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy SQL dump
COPY blog.sql /app/init-db.sql

# Copy supervisor and entrypoint configurations
COPY supervisord.conf /app/supervisord.conf
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# 1. Setup Strapi CMS backend
WORKDIR /app/blog-cms
COPY blog-cms/package*.json ./
RUN npm install
COPY blog-cms/ ./
RUN npm run build

# 2. Setup Astro 7 frontend
WORKDIR /app/regular-resonance
COPY regular-resonance/package*.json ./
RUN npm install
COPY regular-resonance/ ./

WORKDIR /app

# Expose ports: 1337 (Strapi CMS & Admin), 4321 (Astro Frontend)
EXPOSE 1337 4321

ENTRYPOINT ["/app/entrypoint.sh"]
