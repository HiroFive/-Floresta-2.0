import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { ICartItemDto } from '~/common/interfaces';

interface cartItemInstance extends ICartItemDto, Model {}

const createCartItemModule = (orm: Sequelize): ModelCtor<cartItemInstance> => {
  return orm.define<cartItemInstance>(
    ModelName.CartItem,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'cart_item',
      underscored: true,
    },
  );
};
export default createCartItemModule;
