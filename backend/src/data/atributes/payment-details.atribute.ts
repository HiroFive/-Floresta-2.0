export const paymentDetailsAttribute = ['id', 'name'];

export const getPaymentDetailsParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: paymentDetailsAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
