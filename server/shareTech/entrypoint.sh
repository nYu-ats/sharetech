#!/bin/sh

if [ ! -e './shareTech/api' ]; then
  echo "set up application..."
  mkdir shareTech/api
else
  echo "already set up application"
fi

exec "$@"
