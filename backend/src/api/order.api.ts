import { Router } from 'express';
import {
  HttpCode,
  orderApiPathEnum,
  rootApiPathEnum,
  UserRolesEnum,
} from '../common/enums';
import { orderItemsService, orderService, paymentService } from '../services';
import { checkIsFound } from '~/utils';
import { verifyTokenMiddleware } from '~/middleware/verify-token.middleware';
import { authMiddleware } from '~/middleware/auth.middleware';
import { orderValidationMiddleware } from '~/middleware/validation';

export const initOrderApi = (apiRouter: Router): Router => {
  const orderRouter = Router();

  apiRouter.use(rootApiPathEnum.Order, orderRouter);

  orderRouter.get(
    orderApiPathEnum.All,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        const ordersDetails = await orderService.getAll();

        res.status(checkIsFound(ordersDetails)).json(ordersDetails);
      } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
      }
    },
  );

  orderRouter.get(
    orderApiPathEnum.ROOT,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin, UserRolesEnum.Customer]),
    async (_req, res) => {
      try {
        const orderDetails = await orderService.getById(
          Number(`${_req.query.orderNumber}`),
        );

        res.status(checkIsFound(orderDetails)).json(orderDetails);
      } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
      }
    },
  );

  orderRouter.get(
    orderApiPathEnum.GetOrderHistory,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin, UserRolesEnum.Customer]),
    async (_req, res) => {
      try {
        const orderDetails = await orderService.getOrderByUserId(
          `${_req.query.userId || ''}`,
        );

        res.status(checkIsFound(orderDetails)).json(orderDetails);
      } catch (error) {
        res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
      }
    },
  );

  orderRouter.post(
    orderApiPathEnum.ROOT,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    orderValidationMiddleware,
    async (_req, res) => {
      try {
        const order = await orderService.createOrder(_req.body);

        res.status(HttpCode.OK).json(order?.[0]);
      } catch (err) {
        console.log(err);

        const error = err?.errors?.[0] || 'error';
        res.status(HttpCode.BAD_REQUEST).json({ message: error?.message });
      }
    },
  );

  orderRouter.patch(
    orderApiPathEnum.$ID,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    orderValidationMiddleware,
    async (_req, res) => {
      try {
        const order = await orderService.updateOrder(
          Number(_req.params.id),
          _req.body,
        );

        res.status(HttpCode.OK).json(order?.[0]);
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  orderRouter.delete(
    orderApiPathEnum.$ID,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        const id = Number(_req.query?.id);

        await orderService.deleteOrderIds([id]);
        await orderItemsService.deleteByOrderId(id);
        await paymentService.deleteByOrderId(id);

        res.status(HttpCode.NO_CONTENT).json('Success');
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  orderRouter.post(
    orderApiPathEnum.AddNewOrderItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    orderValidationMiddleware,
    async (_req, res) => {
      try {
        const orderItem = await orderItemsService.createOrderItem(_req.body);

        res.status(HttpCode.OK).json(orderItem?.[0]);
      } catch (err) {
        const error = err?.errors?.[0] || 'error';
        res.status(HttpCode.BAD_REQUEST).json({ message: error?.message });
      }
    },
  );

  orderRouter.patch(
    orderApiPathEnum.UpdateOrderItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    orderValidationMiddleware,
    async (_req, res) => {
      try {
        const orderItem = await orderItemsService.updateOrderItem(
          Number(_req.params.id),
          _req.body,
        );

        res.status(HttpCode.OK).json(orderItem?.[0]);
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  orderRouter.delete(
    orderApiPathEnum.DeleteOrderItem,
    verifyTokenMiddleware,
    authMiddleware([UserRolesEnum.Admin]),
    async (_req, res) => {
      try {
        await orderItemsService.deleteById(Number(_req.params?.id));

        res.status(HttpCode.NO_CONTENT).json('Success');
      } catch (err) {
        const error = err?.errors?.[0];
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ message: error?.message });
      }
    },
  );

  return orderRouter;
};
