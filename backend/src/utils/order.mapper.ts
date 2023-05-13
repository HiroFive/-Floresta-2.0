import { IOrderDetails } from '~/common/interfaces';

export const orderMapper = (order: any): IOrderDetails => {
  return {
    id: order.id,
    isAnonymous: order?.isAnonymous,
    paymentDetails: order.paymentDetails,
    user: {
      id: order?.user?.id,
      name: order?.isAnonymous ? 'Anonymous' : order?.user?.name,
    },
    mapMarkerId: order.mapMarkerId,
    status: Number(order?.status),
    createdAt: order?.createdAt,
    total: order?.total,
    items: order.items?.map((item) => {
      return {
        id: item.id,
        name: item.product.name,
        image: item.product.image,
        hidden: item.product.hidden,
        price: item?.quantity * item.product.price,
        quantity: item?.quantity,
        productId: item?.product?.id,
      };
    }),
  };
};

export const ordersMapper = (orders: Array<any>): any => {
  return orders?.map((order) => orderMapper(order));
};
