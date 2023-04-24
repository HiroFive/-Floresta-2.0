import { cartItemAttribute } from '~/data/atributes/cart-item.atribute';
import { cartItemModule } from '~/data/models';

export const cartAttribute = ['id'];

export const getCartParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: cartAttribute,
    include: {
      model: cartItemModule,
      attributes: cartItemAttribute,
      as: 'items',
    },
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
