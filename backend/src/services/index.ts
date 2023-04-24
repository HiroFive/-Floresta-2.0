import { UserService } from './user.service';
import { RoleService } from './role.service';
import { CartService } from '~/services/cart.service';

const userService = new UserService();
const roleService = new RoleService();
const cartService = new CartService();

export { userService, roleService, cartService };
