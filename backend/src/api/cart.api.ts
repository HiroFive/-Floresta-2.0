import { Router } from 'express';
import { cartApiPath, HttpCode, rootApiPath } from '../common/enums';
import { cartService } from '../services';
import { checkIsFound } from '~/utils';

const initCartApi = (apiRouter: Router): Router => {
  const cartRouter = Router();

  apiRouter.use(rootApiPath.Cart, cartRouter);

  cartRouter.get(cartApiPath.ROOT, async (_req, res) => {
    try {
      const cart = await cartService.getCartByUserId(`${_req.query.userId}`);
      res.status(checkIsFound(cart)).json(cart);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error.message });
    }
  });

  return cartRouter;
};
export { initCartApi };
