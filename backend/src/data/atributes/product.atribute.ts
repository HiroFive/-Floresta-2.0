export const productAttribute = ['id', 'name'];

export const getProductParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: productAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
