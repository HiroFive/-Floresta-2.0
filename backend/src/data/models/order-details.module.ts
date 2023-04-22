import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IOrderDetails } from '~/common/interfaces';

interface orderDetailsInstance extends IOrderDetails, Model {}

const createOrderDetailsModule = (
  orm: Sequelize,
): ModelCtor<orderDetailsInstance> => {
  return orm.define<orderDetailsInstance>(
    ModelName.OrderDetails,
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'order_details',
      underscored: true,
    },
  );
};
export default createOrderDetailsModule;
