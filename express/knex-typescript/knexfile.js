require('dotenv').config();

const postgresConfig = {
  client: 'pg',
  connection:
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  migrations: { directory: './db/migrations' },
  seeds: { directory: './db/seeds' },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: postgresConfig,

  staging: postgresConfig,

  production: postgresConfig,
};
