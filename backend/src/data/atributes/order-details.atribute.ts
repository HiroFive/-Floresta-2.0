export const orderDetailsAttribute = ['id', 'name'];

export const getOrderDetailsParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: orderDetailsAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
