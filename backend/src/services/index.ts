import { UserService } from './user.service';
import { RoleService } from './role.service';
import { CartService } from '~/services/cart.service';
import { MapMarkerService } from '~/services/map-marker.service';

const userService = new UserService();
const roleService = new RoleService();
const cartService = new CartService();
const mapMarkerService = new MapMarkerService();

export { userService, roleService, cartService, mapMarkerService };
