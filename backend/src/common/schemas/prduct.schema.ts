import * as yup from 'yup';

export const postProductSchema = yup
  .object()
  .shape({
    image: yup.string().required(),
  })
  .noUnknown();

export const patchProductSchema = yup
  .object()
  .shape({
    image: yup.string(),
    data: yup.object(),
  })
  .noUnknown();
