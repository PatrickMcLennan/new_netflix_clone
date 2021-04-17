#!/bin/bash
cd ..
source .env

echo "Reinstalling node_modules . . ."
npm ci &>/dev/null

echo "Compiling Next.js HTML && express graphql server . . ."
npm run node:build:prod

echo "Shutting down current containers . . ."
docker-compose down

echo "Rebuilding && Restarting Docker Containers . . ."
docker-compose up -d --build --remove-orphans

exit 0
