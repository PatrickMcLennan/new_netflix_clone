#!/bin/bash
cd ..
source .env

clear

echo
echo "Reinstalling node_modules . . ."
echo
npm ci &>/dev/null

echo
echo "Compiling Next.js HTML && express graphql server . . ."
echo
cd scripts
bash compileNode.sh

echo
echo "Shutting down current containers . . ."
echo
cd ..
docker-compose down

echo
echo "Rebuilding && Restarting Docker Containers . . ."
echo
docker-compose up -d --build --remove-orphans

exit 0
