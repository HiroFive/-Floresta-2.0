import * as yup from 'yup';

export const postProductSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    image: yup.string().required(),
    price: yup.number().required(),
    hidden: yup.boolean().required(),
  })
  .noUnknown();

export const patchProductSchema = yup
  .object()
  .shape({
    name: yup.string(),
    image: yup.string(),
    price: yup.number(),
    hidden: yup.boolean(),
  })
  .noUnknown();
