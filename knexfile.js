const knex = require('knex');
const path = require('path');
const { config } = require('dotenv');

config();

module.exports = knex({
  client: `mysql`,
  connection: {
    host: `localhost`,
    port: process.env.MYSQL_PORT,
    user: `root`,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: `catan_scores`
  },
  migrations: {
    directory: path.resolve(__dirname, `./migrations`)
  }
});
