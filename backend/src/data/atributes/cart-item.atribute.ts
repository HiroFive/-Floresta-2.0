import { productModule } from '~/data/models';
import { productAttribute } from '~/data/atributes/product.atribute';

export const cartItemAttribute = ['id', 'quantity'];

export const getCartItemParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: cartItemAttribute,
    include: {
      model: productModule,
      attributes: productAttribute,
    },
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
