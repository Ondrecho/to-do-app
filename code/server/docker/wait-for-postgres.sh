#!/bin/sh
# wait-for-postgres.sh
# Usage: wait-for-postgres host:port -- timeout

HOST=${1:-db}
PORT=${2:-5432}

echo "Waiting for postgres at $HOST:$PORT..."
while ! nc -z $HOST $PORT; do
  sleep 1
done
echo "Postgres is available"
