#!/bin/sh

export ENV=$1
# entrypoint.shはホスト側で作成したファイルなので
# Dockerコンテキストにコピーしても実行できるようにファイル権限を変更
echo 'Add permission to entrypoint.sh'
chmod +x ./client/entrypoint.sh
chmod +x ./server/entrypoint.sh

# ビルド実行
echo 'Start container'
docker-compose up -d
