FROM node:alpine

COPY ./ ./

RUN npm install
RUN npm install --global pm2
RUN npm uninstall bcrypt
RUN npm i bcrypt
