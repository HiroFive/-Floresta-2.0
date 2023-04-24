export const userAttribute = [
  'id',
  'name',
  'email',
  ['sub_id', 'subId'],
  ['role_id', 'role'],
];

export const getUserParams = (type = '', additionalParams = {}): any => {
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
