import { Router } from 'express';
import { HttpCode, roleApiPath, rootApiPath } from '../common/enums';
import { roleService } from '../services';
import { checkIsFound } from '~/utils';

const initRoleApi = (apiRouter: Router): Router => {
  const roleRouter = Router();

  apiRouter.use(rootApiPath.Role, roleRouter);

  roleRouter.get(roleApiPath.ROOT, async (_req, res) => {
    try {
      const role = await roleService.getById(Number(_req?.query?.id || 0));
      res.status(checkIsFound(role)).json(role);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error.message });
    }
  });

  return roleRouter;
};
export { initRoleApi };
