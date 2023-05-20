import { ValidationError } from 'yup';
import { HttpCode } from '~/common/enums';

export const validationErrorStatus = (error: ValidationError) => {
  switch (error.type) {
    case 'noUnknown':
      return HttpCode.UNPROCESSABLE_ENTITY;
    default:
      return HttpCode.BAD_REQUEST;
  }
};
