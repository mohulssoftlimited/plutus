# Stage 1: Build (Node environment)
FROM node:20-slim AS builder
WORKDIR /frontend


# Copy dependency file first for better caching
COPY package.json ./
RUN npm install

# Copy all application code
COPY . .

# Framework-specific instructions
RUN npm install -g serve

# Ensure entry point exists (public/index.html)
RUN test -f public/index.html || (echo "Entry point public/index.html not found" && exit 1)

# Build the application (React)
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=builder /frontend/build /usr/share/nginx/html

# Copy custom nginx.conf from public (optional)
COPY public/nginx.conf /etc/nginx/conf.d/default.conf

# Copy env.js and entrypoint.sh
COPY public/env.js /usr/share/nginx/html/env.js
COPY public/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]

