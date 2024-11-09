export const productAttribute = [
  'id',
  'name',
  'image',
  'price',
  'hidden',
  'description',
];

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
