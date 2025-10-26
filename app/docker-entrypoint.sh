#!/bin/sh

# This script replaces PORT placeholder in nginx config
# with actual value from environment variable

# Railway provides PORT environment variable, default to 80 for local/other platforms
if [ -z "$PORT" ]; then
  export PORT=80
fi

echo "======================================="
echo "Port: $PORT"
echo "======================================="

# Replace the PORT placeholder in nginx config template and output to actual config
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Show the generated config for debugging
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf
echo "======================================="

# Test nginx configuration
nginx -t

# Start nginx
exec nginx -g 'daemon off;'

