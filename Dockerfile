FROM node:latest

WORKDIR /usr/app

RUN npm install --global pm2
RUN npm install --production

COPY ./ ./

RUN npm run express:build:prod

EXPOSE 4000

USER node

CMD ["node", "./scripts/waitForRedis.js"]
