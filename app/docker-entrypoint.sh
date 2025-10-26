#!/bin/sh

# This script replaces placeholders in nginx config
# with actual values from environment variables

# Default to localhost if not set (for local development with docker-compose)
if [ -z "$API_BACKEND_URL" ]; then
  export API_BACKEND_URL="http://server:3000"
fi

# Railway provides PORT environment variable, default to 80 for local/other platforms
if [ -z "$PORT" ]; then
  export PORT=80
fi

echo "======================================="
echo "Backend URL: $API_BACKEND_URL"
echo "Port: $PORT"
echo "======================================="

# Replace the placeholders in nginx config template and output to actual config
envsubst '${API_BACKEND_URL} ${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Show the generated config for debugging
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf
echo "======================================="

# Test nginx configuration
nginx -t

# Start nginx
exec nginx -g 'daemon off;'

