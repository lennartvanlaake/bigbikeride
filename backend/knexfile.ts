import * as path from 'path';
require('dotenv').config({path: '../.env'})
const connection = `postgres://postgres:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/bikeride`

module.exports = {
    client: 'pg',
    connection: connection,
    migrations: {
      directory: path.join(__dirname, 'migrations'),
  }
};