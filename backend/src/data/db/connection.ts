import { Dialect, Sequelize } from 'sequelize';
import databaseConfig from '../../config/database.config';
import { EnvironmentEnum } from '../../common/enums';

const db =
  process.env.NODE_ENV === EnvironmentEnum.DEVELOPMENT
    ? databaseConfig.development
    : databaseConfig.production;

const sequelize = new Sequelize({
  ...db,
  port: Number(db.port),
  dialect: db.dialect as Dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
