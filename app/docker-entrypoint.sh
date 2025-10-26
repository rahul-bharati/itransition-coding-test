#!/bin/sh

# This script replaces the API_BACKEND_URL placeholder in nginx config
# with the actual backend service URL from environment variable

# Default to localhost if not set (for local development with docker-compose)
if [ -z "$API_BACKEND_URL" ]; then
  export API_BACKEND_URL="http://server:3000"
fi

echo "======================================="
echo "Backend URL: $API_BACKEND_URL"
echo "======================================="

# Replace the placeholder in nginx config template and output to actual config
# Note: Using ${API_BACKEND_URL} syntax to match the template
envsubst '${API_BACKEND_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Show the generated config for debugging
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf
echo "======================================="

# Test nginx configuration
nginx -t

# Start nginx
exec nginx -g 'daemon off;'

