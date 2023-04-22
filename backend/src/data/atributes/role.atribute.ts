export const roleAttribute = ['id', 'name'];

export const getRoleParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: roleAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
