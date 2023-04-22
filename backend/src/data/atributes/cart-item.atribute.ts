export const cartItemAttribute = ['id', 'name'];

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
