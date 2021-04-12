FROM node:14

WORKDIR /usr/src/app

RUN npm install --global pm2
RUN npm install --global express
RUN npm install --global graphql
RUN npm install --global apollo-server-express
RUN npm install --global typescript

COPY . .

RUN npm run express:build:prod

EXPOSE 4000

USER node

CMD ["pm2-runtime", "node", "--", "express/dist/express/server.js"]