import { cartItemAttribute } from '~/data/atributes/cart-item.atribute';
import { cartItemModule, productModule } from '~/data/models';
import { productAttribute } from '~/data/atributes/product.atribute';

export const cartAttribute = ['id'];

export const getCartParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: cartAttribute,
    include: [
      {
        model: cartItemModule,
        attributes: cartItemAttribute,
        as: 'items',
        include: [
          {
            model: productModule,
            attributes: productAttribute,
            as: 'product',
          },
        ],
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
