FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

RUN npm install --production

COPY ./ ./

RUN npm run node:build:prod

EXPOSE 4000

USER node

CMD ["pm2-runtime", "start", "pm2.json"]