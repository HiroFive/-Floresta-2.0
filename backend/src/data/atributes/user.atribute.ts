export const userAttribute = ['id', 'name', 'email', 'sub_id', 'role_id'];

export const getUserParams = (type = '', additionalParams = {}) => {
  const defaultParams = {
    attributes: userAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
