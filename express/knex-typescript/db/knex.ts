import knex from "knex";
import knexfile from "../knexfile";

const env = process.env.NODE_ENV || 'development';

if (!knexfile[env]) {
  throw new Error(`Knexfile for ${env} environment not found`);
}

export default knex(knexfile[env]);
