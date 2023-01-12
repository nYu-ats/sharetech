#!/bin/sh

if [ ! -e './api' ]; then
  echo "set up application..."
  mkdir api
  cd api
  pipenv --python 3.8.10
else
  echo "already set up application"
fi

exec "$@"
