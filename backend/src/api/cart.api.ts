import { Router } from 'express';
import { cartApiPathEnum, HttpCode, rootApiPathEnum } from '../common/enums';
import { cartService } from '../services';
import { checkIsFound } from '~/utils';

export const initCartApi = (apiRouter: Router): Router => {
  const cartRouter = Router();

  apiRouter.use(rootApiPathEnum.Cart, cartRouter);

  cartRouter.get(cartApiPathEnum.ROOT, async (_req, res) => {
    try {
      const cart = await cartService.getCartByUserId(`${_req.query.userId}`);
      res.status(checkIsFound(cart)).json(cart);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error.message });
    }
  });

  cartRouter.delete(cartApiPathEnum.DeleteByUserId, async (_req, res) => {
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
