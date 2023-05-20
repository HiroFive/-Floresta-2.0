import * as yup from 'yup';

export const postUserSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().required(),
    subId: yup.string().required(),
    role: yup.number().required(),
  })
  .noUnknown();

export const patchUserSchema = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string(),
    subId: yup.string(),
    role: yup.number(),
  })
  .noUnknown();
