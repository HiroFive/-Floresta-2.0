import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IProductDto } from '~/common/interfaces';

interface productInstance extends IProductDto, Model {}

const createProductModule = (orm: Sequelize): ModelCtor<productInstance> => {
  return orm.define<productInstance>(
    ModelName.Product,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'product',
      underscored: true,
    },
  );
};
export default createProductModule;
