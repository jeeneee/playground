#!/bin/bash
set -e

function wait_for_mongo() {
  local name=$1
  local host=$2
  local port=$3
  echo "⏳ Waiting for $name ($host:$port)..."
  until mongosh --host "$host" --port "$port" --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
    sleep 1
  done
  echo "✅ $name is ready!"
}

# config
wait_for_mongo "mongo-configsvr1" mongo-configsvr1 27017
mongosh --host mongo-configsvr1 --port 27017 /scripts/init-config.js

# shard1
wait_for_mongo "mongo-shard1-1" mongo-shard1-1 27017
wait_for_mongo "mongo-shard1-2" mongo-shard1-2 27017
wait_for_mongo "mongo-shard1-3" mongo-shard1-3 27017
mongosh --host mongo-shard1-1 --port 27017 /scripts/init-shard1.js

# shard2
wait_for_mongo "mongo-shard2-1" mongo-shard2-1 27017
wait_for_mongo "mongo-shard2-2" mongo-shard2-2 27017
wait_for_mongo "mongo-shard2-3" mongo-shard2-3 27017
mongosh --host mongo-shard2-1 --port 27017 /scripts/init-shard2.js

# mongos
echo "🚀 Starting mongo-mongos..."
mongos --configdb configReplSet/mongo-configsvr1:27017 --bind_ip_all &
MONGOS_PID=$!

wait_for_mongo "mongo-mongos" localhost 27017

mongosh --host localhost --port 27017 /scripts/add-shards.js

mongosh --host localhost --port 27017 /scripts/init-db.js

wait $MONGOS_PID
