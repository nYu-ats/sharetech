#! /bin/bash

mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD << EOT
use ${ENV};
db.createUser({user: "${MONGO_APP_USER}", pwd:"${MONGO_APP_PASSWORD}",roles:[{role:"dbOwner",db:"${ENV}"},{role:"dbAdmin",db:"${ENV}"},{role:"readWrite",db:"${ENV}"}]});
EOT