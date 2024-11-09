import {
  orderItemModule,
  paymentDetailModule,
  productModule,
  userModule,
} from '~/data/models';
import { productAttribute } from '~/data/atributes/product.atribute';

export const orderDetailsAttribute = [
  'id',
  'type',
  'isAnonymous',
  'total',
  'status',
  'createdAt',
  'mapMarkerId',
];

export const getOrderDetailsParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: orderDetailsAttribute,
    include: [
      {
        model: orderItemModule,
        attributes: ['id', 'quantity'],
        as: 'items',
        include: [
          {
            model: productModule,
            attributes: productAttribute,
            as: 'product',
          },
        ],
      },
      {
        model: paymentDetailModule,
        attributes: ['id', 'provider'],
        as: 'paymentDetails',
      },

      {
        model: userModule,
        attributes: ['id', 'name'],
        as: 'user',
      },
    ],
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
