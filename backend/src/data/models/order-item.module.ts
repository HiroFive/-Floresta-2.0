import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IOrderItemDto } from '~/common/interfaces';

interface orderItemsInstance extends IOrderItemDto, Model {}

const createOrderItemModule = (
  orm: Sequelize,
): ModelCtor<orderItemsInstance> => {
  return orm.define<orderItemsInstance>(
    ModelName.OrderItem,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'order_item',
      underscored: true,
    },
  );
};
export default createOrderItemModule;
