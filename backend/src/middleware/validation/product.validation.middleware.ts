import { HttpMethodsEnum } from '../../common/enums';
import { validationErrorStatus } from '~/utils';
import {
  patchProductSchema,
  postProductSchema,
} from '~/common/schemas/prduct.schema';

export const productValidationMiddleware = async (_req, res, next) => {
  const validParams = {
    strict: true,
    abortEarly: true,
  };

  switch (_req.method) {
    case HttpMethodsEnum.POST:
      try {
        _req.body = await postProductSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case HttpMethodsEnum.PATCH:
      try {
        _req.body = await patchProductSchema.validate(_req.body, validParams);
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
