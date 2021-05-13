const knex = require('knex');
const path = require('path');
const { config } = require('dotenv');

config({ path: path.resolve(__dirname, `./env`) });

module.exports = knex({
  client: `mysql`,
  connection: {
    host: `mysql`,
    port: process.env.MYSQL_PORT,
    user: `root`,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: `netflix-clone`
  },
  migrations: {
    directory: path.resolve(__dirname, `./migrations`)
  }
});
