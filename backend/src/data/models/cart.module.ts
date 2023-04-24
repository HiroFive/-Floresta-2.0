import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ICart } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface cartInstance extends ICart, Model {}

const createCartModule = (orm: Sequelize): ModelCtor<cartInstance> => {
  return orm.define<cartInstance>(
    ModelName.Cart,
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      userId: {
        type: DataTypes.UUID,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'cart',
      underscored: true,
    },
  );
};
export default createCartModule;
