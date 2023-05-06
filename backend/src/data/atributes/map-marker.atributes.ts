import { ParamsTypeEnum, UserRolesEnum } from '~/common/enums';
import { productModule } from '~/data/models';
import { productAttribute } from '~/data/atributes/product.atribute';

export const mapMarkerAttribute = ['id', 'lat', 'lng', 'hidden', 'productIds'];

const getParamsByRole = (roleId = UserRolesEnum.Customer) => {
  const paramsByRole: any = {
    attributes: mapMarkerAttribute,
  };

  if (roleId === UserRolesEnum.Customer) {
    return {
      ...paramsByRole,
      where: {
        hidden: false,
      },
    };
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
    case ParamsTypeEnum.GetByRoleId:
      return { ...getParamsByRole(additionalParams?.roleId) };
    case ParamsTypeEnum.ProductInfo:
      return {
        ...defaultParams,
        include: {
          model: productModule,
          attributes: productAttribute,
          as: 'products',
        },
      };
    default:
      return defaultParams;
  }
};
