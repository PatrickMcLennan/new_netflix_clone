FROM node:alpine

COPY ./ ./

RUN npm install
RUN npm install --global pm2
