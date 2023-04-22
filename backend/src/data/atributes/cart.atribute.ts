export const cartAttribute = ['id', 'name'];

export const getCartParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: cartAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
