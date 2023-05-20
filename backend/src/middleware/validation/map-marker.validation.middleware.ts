import { HttpMethodsEnum } from '../../common/enums';
import {
  patchMapMarkerSchema,
  postMapMarkerSchema,
} from '~/common/schemas/map-merker.schema';
import { validationErrorStatus } from '~/utils';

export const mapMarkerValidationMiddleware = async (_req, res, next) => {
  const validParams = {
    strict: true,
    abortEarly: true,
  };

  switch (_req.method) {
    case HttpMethodsEnum.POST:
      try {
        _req.body = await postMapMarkerSchema.validate(_req.body, validParams);
      } catch (error) {
        return res
          .status(validationErrorStatus(error))
          .json({ message: error?.errors });
      }
      break;
    case HttpMethodsEnum.PATCH:
      try {
        _req.body = await patchMapMarkerSchema.validate(_req.body, validParams);
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
