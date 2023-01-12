#!/bin/sh

if [ ! -e './app' ]; then
  echo "set up application..."
  npx create-next-app app --ts --eslint --use-npm
else
  echo "already set up application"
fi

exec "$@"
