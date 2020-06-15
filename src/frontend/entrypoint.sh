#!/bin/sh

# change env file with DOCKER VARIABLE URL_API value
sed -i "s;^[# ]*\(window.__env.apiUrl * = *\)\(.*\);\1'${URL_API}'\;;" "/usr/share/nginx/html/env.js"

if [ -z "$URL_API" ]; then
  echo "env URL_API is empty, http://localhost will be used"
  export URL_API="http://localhost"
fi

#Substituir as variáveis de ambiente para apontar para o backend
envsubst '${URL_API}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Starting nginx..."
exec nginx -g "daemon off;" ${EXTRA_ARGS}
