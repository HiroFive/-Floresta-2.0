import { IOrderDetails, IOrderDetailsDto } from '~/common/interfaces';
import { orderDetailsRepository } from '~/data/repositories';
import {
  cartService,
  orderItemsService,
  paymentService,
} from '~/services/index';
import { OrderStatusEnum } from '~/common/enums';
import { orderMapper, ordersMapper } from '~/utils/order.mapper';

export class OrderService {
  public getById(orderId: number): Promise<IOrderDetails> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = orderMapper(
          await orderDetailsRepository.getById(orderId),
        );

        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
    return;
  }

  public getAll(): Promise<Array<IOrderDetails>> {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = ordersMapper(await orderDetailsRepository.getAll());

        resolve(orders);
      } catch (error) {
        reject(error);
      }
    });
    return;
  }

  public createOrder(orderDetails: any): Promise<IOrderDetailsDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const orderInstance = await orderDetailsRepository.createOrder({
          total: `${orderDetails.total}`,
          userId: orderDetails.userId,
          mapMarkerId: orderDetails.mapMarkerId,
          isAnonymous: orderDetails.isAnonymous,
          status: OrderStatusEnum.Created,
        });

        for (const item of orderDetails?.items) {
          const { productId, quantity } = item;
          await orderItemsService.createOrderItem({
            orderId: orderInstance.id,
            productId,
            quantity,
          });
        }

        await cartService.deleteCartByUserId(orderDetails.userId);

        const payment = await paymentService.createPayment({
          provider: `${orderDetails.payment.provider}`,
          orderId: orderInstance.id,
        });

        const order = orderDetailsRepository.updateById(orderInstance.id, {
          paymentId: payment.id,
        });

        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async updateOrder(
    id: number,
    data: IOrderDetailsDto,
  ): Promise<IOrderDetailsDto[]> {
    return orderDetailsRepository.updateById(id, data);
  }

  public deleteOrderIds(ids: Array<number>): Promise<number> {
    return orderDetailsRepository.deleteByIds(ids);
  }
}
