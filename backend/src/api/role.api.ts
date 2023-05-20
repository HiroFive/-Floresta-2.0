import { Router } from 'express';
import {
  HttpCode,
  roleApiPathenum,
  rootApiPathEnum,
  UserRolesEnum,
} from '../common/enums';
import { roleService } from '../services';
import { checkIsFound } from '~/utils';
import { verifyTokenMiddleware } from '~/middleware/verify-token.middleware';
import { authMiddleware } from '~/middleware/auth.middleware';

export const initRoleApi = (apiRouter: Router): Router => {
  const roleRouter = Router();

  apiRouter.use(rootApiPathEnum.Role, roleRouter);

  roleRouter.get(
    roleApiPathenum.ROOT,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        const role = await roleService.getById(Number(_req?.query?.id || 0));
        res.status(checkIsFound(role)).json(role);
      } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({ message: error.message });
      }
    },
  );

  roleRouter.get(
    roleApiPathenum.All,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        const roles = await roleService.getAllRoles();
        res.status(checkIsFound(roles)).json(roles);
      } catch (error) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json([]);
      }
    },
  );

  return roleRouter;
};
