import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_TEST_NAME,
  DB_TEST_USERNAME,
  DB_TEST_PASSWORD,
  DB_TEST_HOST,
  DB_TEST_PORT,
} = process.env;

export default {
  development: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
  },
  test: {
    database: DB_TEST_NAME,
    username: DB_TEST_USERNAME,
    password: DB_TEST_PASSWORD,
    host: DB_TEST_HOST,
    port: DB_TEST_PORT,
    dialect: DB_DIALECT,
    logging: false,
  },
  production: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
  },
};
