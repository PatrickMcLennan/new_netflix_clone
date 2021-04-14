#!/bin/bash
cd ..
source .env

echo "Reinstalling node_modules . . ."
# rm -r node_modules &>/dev/null
# npm install &>/dev/null

echo "Compiling Next.js HTML . . ."
npm run next:export

echo "Rebuilding && Restarting Docker Containers . . ."
docker-compose up -d --build --remove-orphans

exit 0
