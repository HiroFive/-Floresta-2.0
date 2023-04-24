export const cartItemAttribute = ['id', 'quantity'];

export const getCartItemParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: cartItemAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
