import { sequelize } from '../db/connection';

import createUserModule from './user.model';
import createRoleModule from './role.module';
import createCartModule from './cart.module';
import createCartItemModule from './cart-item.module';
import createOrderDetailsModule from './order-details.module';
import createOrderItemModule from './order-item.module';
import createPaymentDetailsModule from './payment-details.module';
import createProductModule from './product.module';

const userModule = createUserModule(sequelize);
const roleModule = createRoleModule(sequelize);
const cartModule = createCartModule(sequelize);
const cartItemModule = createCartItemModule(sequelize);
const orderDetailsModule = createOrderDetailsModule(sequelize);
const orderItemModule = createOrderItemModule(sequelize);
const paymentDetailModule = createPaymentDetailsModule(sequelize);
const productModule = createProductModule(sequelize);

userModule.belongsTo(roleModule, {
  foreignKey: 'roleId',
});

export {
  userModule,
  roleModule,
  cartModule,
  cartItemModule,
  orderDetailsModule,
  orderItemModule,
  paymentDetailModule,
  productModule,
};
