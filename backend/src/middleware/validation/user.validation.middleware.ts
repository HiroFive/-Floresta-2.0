import { HttpMethodsEnum } from '../../common/enums';
import { validationErrorStatus } from '~/utils';
import { patchUserSchema, postUserSchema } from '~/common/schemas/user.schema';

export const userValidationMiddleware = async (_req, res, next) => {
  const validParams = {
    strict: true,
    abortEarly: true,
  };

  switch (_req.method) {
    case HttpMethodsEnum.POST:
      try {
        _req.body = await postUserSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case HttpMethodsEnum.PATCH:
      try {
        _req.body = await patchUserSchema.validate(_req.body, validParams);
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
