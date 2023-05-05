import { UserRolesEnum } from '~/common/enums';

export const mapMarkerAttribute = ['id', 'lat', 'lng', 'hidden', 'productIds'];

const getParamsByRole = (roleId: number) => {
  const paramsByRole: any = {
    attributes: mapMarkerAttribute,
  };

  if (roleId === UserRolesEnum.Customer) {
    paramsByRole.where.hidden = false;
  }
  return paramsByRole;
};

export const getMapMarketParams = (
  type = '',
  additionalParams: { [key: string]: any } = {},
) => {
  const defaultParams = {
    attributes: mapMarkerAttribute,
  };

  switch (type) {
    case 'filter':
      return { ...defaultParams, where: { ...additionalParams } };
    case 'getByRoleId':
      return { ...getParamsByRole(additionalParams?.roleId) };
    default:
      return defaultParams;
  }
};
