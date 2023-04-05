import { Sequelize, Dialect } from 'sequelize';
import databaseConfig from '../../config/database.config';
import { EnvironmentEnum } from '../../common/enums';

const db = process.env.NODE_ENV === EnvironmentEnum.TEST ? databaseConfig.test : databaseConfig.development;

const sequelize = new Sequelize({
  ...db,
  port: Number(db.port),
  dialect: db.dialect as Dialect,
  logging: false,
});

export { sequelize };
