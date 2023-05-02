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

  cartRouter.delete(cartApiPath.DeleteByUserId, async (_req, res) => {
    try {
      const cart = await cartService.getCartByUserId(_req.params.id);
      if (cart) {
        await cartService.createCartByUserId(_req.params.id);
        await cartService.deleteCartById(cart.id);
      }

      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err.errors[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  return cartRouter;
};
export { initCartApi };
