import { Router } from 'express';
import { HttpCode, rootApiPath, userApiPath } from '../common/enums';
import { cartService, userService } from '../services';
import { checkIsFound } from '~/utils';

const initUserApi = (apiRouter: Router): Router => {
  const userRouter = Router();
  // const upload = multerUploadFile();

  apiRouter.use(rootApiPath.User, userRouter);

  userRouter.get(userApiPath.All, async (_req, res) => {
    try {
      let users = await userService.getAllUsers();
      users = users?.map(
        (user) =>
          ({
            id: user?.id,
            name: user.name,
            email: user.email,
            subId: user.subId,
            role: (user?.role as any)?.name,
          } as any),
      );

      res.status(checkIsFound(users)).json(users);
    } catch (error) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json([]);
    }
  });

  userRouter.get(userApiPath.$SubID, async (_req, res) => {
    try {
      const user = await userService.getUserBySubId(_req.params.subId);
      res.status(checkIsFound(user?.[0])).json(user?.[0] || {});
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error.message });
    }
  });

  userRouter.post(userApiPath.ROOT, async (_req, res) => {
    try {
      const user = await userService.createNewUser(_req.body);
      await cartService.createCartByUserId(user.id);

      res.status(HttpCode.OK).json(user);
    } catch (err) {
      const error = err?.errors?.[0] || 'error';
      res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
    }
  });

  userRouter.patch(userApiPath.$ID, async (_req, res) => {
    try {
      const user = await userService.updateUser(_req.params.id, _req.body);
      res.status(HttpCode.OK).json(user?.[0]);
    } catch (err) {
      const error = err.errors[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  userRouter.delete(userApiPath.$ID, async (_req, res) => {
    try {
      await userService.deleteUser(_req.params.id);
      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err.errors[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  return userRouter;
};
export { initUserApi };
