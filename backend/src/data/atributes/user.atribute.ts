import { roleModule } from '~/data/models';

export const userAttribute = ['id', 'name', 'email', ['sub_id', 'subId']];

export const roleIdAsRole = [['role_id', 'role']];
export const getUserParams = (type = '', additionalParams = {}): any => {
  const defaultParams = {
    attributes: [...userAttribute, ...roleIdAsRole],
  };

  switch (type) {
    case 'withRoleName':
      return {
        attributes: [...userAttribute],
        include: {
          model: roleModule,
          as: 'role',
          attributes: ['name'],
        },
      };
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    default:
      return defaultParams;
  }
};
