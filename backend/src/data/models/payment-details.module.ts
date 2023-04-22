import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IPaymentDetails } from '~/common/interfaces';

interface paymentDetailsInstance extends IPaymentDetails, Model {}

const createPaymentDetailsModule = (
  orm: Sequelize,
): ModelCtor<paymentDetailsInstance> => {
  return orm.define<paymentDetailsInstance>(
    ModelName.PaymentDetails,
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'payment_details',
      underscored: true,
    },
  );
};
export default createPaymentDetailsModule;
