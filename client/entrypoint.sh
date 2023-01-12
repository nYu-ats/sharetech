#!/bin/sh

if [ ! -e './app' ]; then
  echo "set up application..."
  npm install -g create-next-app@13.0.7
  npx create-next-app app --ts --eslint --use-npm
else
  echo "already set up application"
fi

exec "$@"
