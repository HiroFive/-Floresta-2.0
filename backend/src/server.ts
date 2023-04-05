import express, { json, urlencoded } from 'express';
import { initApi } from './api/api';
import { sequelize } from './data/db/connection';
import { LogRequest } from './middleware/request-logger.middleware';
import cors from 'cors';
import { ConnectionError as DbConnectionError } from 'sequelize';

const app = express();

sequelize
  .authenticate()
  .then(() => {
    return console.log('Database connection was successful');
  })
  .catch(({ message, stack }: DbConnectionError) => {
    return console.error(message, stack);
  });

app.use(cors());
app.use(LogRequest);
// app.use(validationMiddleware);
app.use(json({ limit: '670kb' }));
app.use(urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, PATCH, GET, POST');
  next();
});

initApi(app);

export { app };
