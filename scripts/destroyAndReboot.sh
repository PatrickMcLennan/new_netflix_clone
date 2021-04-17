#!/bin/bash

cd ../ && docker-compose down && docker system prune && docker container prune && docker image prune && cd scripts && bash prodDeploy.sh
