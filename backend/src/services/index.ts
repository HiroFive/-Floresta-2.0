import { UserService } from './user.service';
import { RoleService } from './role.service';

const userService = new UserService();
const roleService = new RoleService();

export { userService, roleService };
