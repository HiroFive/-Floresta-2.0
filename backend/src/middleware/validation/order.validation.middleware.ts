import { HttpMethodsEnum, orderApiPathEnum } from '../../common/enums';
import { validationErrorStatus } from '~/utils';
import {
  patchOrderItemSchema,
  patchOrderSchema,
  postOrderItemSchema,
  postOrderSchema,
} from '~/common/schemas/order.schema';

export const orderValidationMiddleware = async (_req, res, next) => {
  const pathAndMethod = `${_req.originalUrl}/${
    _req.id === undefined ? '' : _req.id
  } method=${_req.method}`;

  const validParams = {
    strict: true,
    abortEarly: true,
  };

  switch (pathAndMethod) {
    case `/api/order${orderApiPathEnum.ROOT} method=${HttpMethodsEnum.POST}`:
      try {
        _req.body = await postOrderSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case `/api/order${orderApiPathEnum.ROOT} method=${HttpMethodsEnum.PATCH}`:
      try {
        _req.body = await patchOrderSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case `/api/order${orderApiPathEnum.AddNewOrderItem} method=${HttpMethodsEnum.POST}`:
      try {
        _req.body = await postOrderItemSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case `/api/order${orderApiPathEnum.UpdateOrderItem} method=${HttpMethodsEnum.PATCH}`:
      try {
        _req.body = await patchOrderItemSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    default:
      break;
  }

  next();
};
