FROM node:22-alpine AS builder
WORKDIR /app

# Enable Corepack to support pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arg for API backend URL
ARG VITE_API_BACKEND_URL
ENV VITE_API_BACKEND_URL=$VITE_API_BACKEND_URL

# Build the production bundle (dist/)
RUN pnpm run build

# Production stage with nginx
FROM nginx:alpine

# Install envsubst (part of gettext package)
RUN apk add --no-cache gettext

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration as template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
# Ensure line endings are UNIX-style (remove CR) and make script executable. This
# prevents '/bin/sh^M: bad interpreter' when the file has CRLF from Windows/WSL.
RUN sed -i 's/\r$//' /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Use custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
