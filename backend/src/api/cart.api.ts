import { Router } from 'express';
import {
  cartApiPathEnum,
  HttpCode,
  rootApiPathEnum,
  UserRolesEnum,
} from '../common/enums';
import { cartItemService, cartService } from '../services';
import { checkIsFound } from '~/utils';
import { verifyTokenMiddleware } from '~/middleware/verify-token.middleware';
import { authMiddleware } from '~/middleware/auth.middleware';
import { cartValidationMiddleware } from '~/middleware/validation';

export const initCartApi = (apiRouter: Router): Router => {
  const cartRouter = Router();

  apiRouter.use(rootApiPathEnum.Cart, cartRouter);

  cartRouter.get(
    cartApiPathEnum.ROOT,
    [
      verifyTokenMiddleware,
      authMiddleware([UserRolesEnum.Admin, UserRolesEnum.Customer]),
    ],
    async (_req, res) => {
      try {
        const cart = await cartService.getCartByUserId(`${_req.query.userId}`);

        res.status(HttpCode.OK).json(cart);
      } catch (error) {
        console.log(error);
        res.status(HttpCode.NOT_FOUND).json({ message: error.message });
      }
    },
  );

  cartRouter.post(cartApiPathEnum.ROOT, async (_req, res) => {
    try {
      const cartItem = await cartService.createCartByUserId(_req.body?.userId);

      res.status(checkIsFound(cartItem)).json(cartItem);
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
    }
  });

  cartRouter.post(
    cartApiPathEnum.CreateCartItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    cartValidationMiddleware,
    async (_req, res) => {
      try {
        const cartItem = await cartItemService.createCartItem({
          ..._req.body,
          cartId: Number(_req.query.cartId || 0),
          productId: Number(_req.query.productId || 0),
        });

        res.status(checkIsFound(cartItem)).json(cartItem);
      } catch (error) {
        res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
      }
    },
  );

  cartRouter.patch(
    cartApiPathEnum.UpdateCartItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    cartValidationMiddleware,
    async (_req, res) => {
      try {
        const cartItem = await cartItemService.updateCartItem(
          Number(_req.query.id || 0),
          {
            ..._req.body,
          },
        );

        res.status(checkIsFound(cartItem)).json(cartItem);
      } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({ message: error.message });
      }
    },
  );

  cartRouter.delete(
    cartApiPathEnum.DeleteCartItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        const idsArray = Array.isArray(_req.query?.id)
          ? (_req.query?.id as any)?.map((id) => Number(id || 0))
          : [Number(_req.query?.id || 0)];

        await cartItemService.deleteById(idsArray);

        res.status(HttpCode.NO_CONTENT).json('Success');
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  cartRouter.delete(
    cartApiPathEnum.DeleteByUserId,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        await cartService.deleteCartByUserId(_req.params.id);

        res.status(HttpCode.NO_CONTENT).json('Success');
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  return cartRouter;
};
