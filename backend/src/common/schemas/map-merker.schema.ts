import * as yup from 'yup';

export const postMapMarkerSchema = yup
  .object()
  .shape({
    hidden: yup.boolean().required(),
    lat: yup.number().required(),
    lng: yup.number().required(),
    productIds: yup.array().required(),
  })
  .noUnknown();

export const patchMapMarkerSchema = yup
  .object()
  .shape({
    hidden: yup.boolean(),
    lat: yup.number(),
    lng: yup.number(),
    productIds: yup.array(),
  })
  .noUnknown();
