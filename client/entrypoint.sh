#!/bin/sh

if [ ! -e './app' ]; then
  echo "set up application..."
  # docker-composeのvolumesにより上書きされてしまうためentrypoint内で実行
  npm install -g create-next-app@13.0.7
  npx create-next-app app --ts --eslint --use-npm
else
  cd app
  npm install
  echo "already set up application"
fi

# CMDの指定があれば以下で実行
exec "$@"