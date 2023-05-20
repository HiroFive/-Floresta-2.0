import { HttpMethodsEnum } from '../../common/enums';
import { validationErrorStatus } from '~/utils';
import { patchCartSchema, postCartSchema } from '~/common/schemas/cart.schema';

export const cartValidationMiddleware = async (_req, res, next) => {
  const validParams = {
    strict: true,
    abortEarly: true,
  };

  switch (_req.method) {
    case HttpMethodsEnum.POST:
      try {
        _req.body = await postCartSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case HttpMethodsEnum.PATCH:
      try {
        _req.body = await patchCartSchema.validate(_req.body, validParams);
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
