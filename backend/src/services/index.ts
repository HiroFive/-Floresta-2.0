import { UserService } from './user.service';
import { RoleService } from './role.service';
import { CartService } from './cart.service';
import { MapMarkerService } from './map-marker.service';
import { ProductService } from './product.service';
import { UploadImageService } from './upload-image.service';
import { CartItemService } from '~/services/cart-item.service';

export const userService = new UserService();
export const roleService = new RoleService();
export const cartService = new CartService();
export const mapMarkerService = new MapMarkerService();
export const productService = new ProductService();
export const uploadImageService = new UploadImageService();

export const cartItemService = new CartItemService();
