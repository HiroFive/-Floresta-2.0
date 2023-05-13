export const orderItemAttribute = ['id', 'productId', 'orderId'];

export const getOrderItemParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: orderItemAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
