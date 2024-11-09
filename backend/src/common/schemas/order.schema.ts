import * as yup from 'yup';

export const postOrderSchema = yup
  .object()
  .shape({
    type: yup.string().required(),
    isAnonymous: yup.boolean().required(),
    mapMarkerId: yup.number().required(),
    userId: yup.string().required(),
    total: yup.number().required(),
    payment: yup.object().required(),
    items: yup.array().of(yup.object()).required(),
  })
  .noUnknown();

export const patchOrderSchema = yup
  .object()
  .shape({
    type: yup.string().required(),
    status: yup.string().required(),
  })
  .noUnknown();

export const postOrderItemSchema = yup
  .object()
  .shape({
    quantity: yup.number().required(),
  })
  .noUnknown();

export const patchOrderItemSchema = yup
  .object()
  .shape({
    quantity: yup.number(),
  })
  .noUnknown();
