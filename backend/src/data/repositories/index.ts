import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { CartRepository } from './cart.repository';
import { CartItemRepository } from './cart-item.repository';
import { OrderDetailsRepository } from './order-details.repository';
import { OrderItemRepository } from './order-item.repository';
import { PaymentDetailsRepository } from './payment-details.repository';
import { ProductRepository } from './product.repository';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const cartRepository = new CartRepository();
const cartItemRepository = new CartItemRepository();
const orderDetailsRepository = new OrderDetailsRepository();
const orderItemRepository = new OrderItemRepository();
const paymentDetailsRepository = new PaymentDetailsRepository();
const productRepository = new ProductRepository();

export {
  userRepository,
  roleRepository,
  cartRepository,
  cartItemRepository,
  orderDetailsRepository,
  orderItemRepository,
  paymentDetailsRepository,
  productRepository,
};
