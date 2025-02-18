#!/bin/sh
    # Replace placeholder in env.js with the actual container env var
    sed -i "s|PLACEHOLDER_BACKEND_URL|${REACT_APP_BACKEND_URL}|g" /usr/share/nginx/html/env.js

    # Start nginx in the foreground
    exec nginx -g 'daemon off;'
    