import * as yup from 'yup';

export const postCartSchema = yup
  .object()
  .shape({
    quantity: yup.number().required(),
  })
  .noUnknown();

export const patchCartSchema = yup
  .object()
  .shape({
    quantity: yup.number(),
  })
  .noUnknown();
