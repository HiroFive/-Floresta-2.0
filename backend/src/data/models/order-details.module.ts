import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IOrderDetailsDto } from '~/common/interfaces';

interface orderDetailsInstance extends IOrderDetailsDto, Model {}

const createOrderDetailsModule = (
  orm: Sequelize,
): ModelCtor<orderDetailsInstance> => {
  return orm.define<orderDetailsInstance>(
    ModelName.OrderDetails,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      total: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.INTEGER,
      },
      mapMarkerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAnonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.STRING,
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
