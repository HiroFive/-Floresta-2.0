import { ICartFullInfo, IRawCartFullInfo } from '~/common/interfaces';

export const cartMapper = (cart: IRawCartFullInfo): ICartFullInfo => {
  return {
    id: cart.id,
    items: cart?.items?.map((item) => {
      return {
        id: item?.id,
        quantity: item?.quantity,
        productId: item?.product?.id,
        name: item?.product.name,
        image: item?.product?.image,
        price: item?.product?.price,
        hidden: item?.product?.hidden,
      };
    }) as any,
  };
};
