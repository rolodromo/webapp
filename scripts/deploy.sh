#!/bin/bash

DOKKU_HOST=rolodromo.com
APP_NAME=webapp

docker build -t dokku/$APP_NAME:latest .
docker save dokku/$APP_NAME | bzip2 | ssh $DOKKU_HOST "bunzip2 | docker load"
ssh $DOKKU_HOST "dokku tags:create $APP_NAME latest"
echo "Now ssh and run 'dokku deploy $APP_NAME'"
