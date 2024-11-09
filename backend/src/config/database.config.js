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
  USE_SSL,
} = process.env;

const dialectOptions =
  USE_SSL === 'true'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {};

module.exports = {
  development: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions,
  },
  test: {
    database: DB_TEST_NAME,
    username: DB_TEST_USERNAME,
    password: DB_TEST_PASSWORD,
    host: DB_TEST_HOST,
    port: DB_TEST_PORT,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions,
  },
  production: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    dialectOptions,
  },
};
