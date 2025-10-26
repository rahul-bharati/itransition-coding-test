#!/bin/sh

# This script replaces the API_BACKEND_URL placeholder in nginx config
# with the actual backend service URL from environment variable

# Default to localhost if not set (for local development)
BACKEND_URL=${API_BACKEND_URL:-http://localhost:3000}

# Replace the placeholder in nginx config
envsubst '${API_BACKEND_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'

