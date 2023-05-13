import { orderItemModule } from '../models';
import { getOrderItemParams } from '../atributes';
import { IOrderItemDto } from '~/common/interfaces';

export class OrderItemRepository {
  public getById(id: number): Promise<IOrderItemDto | null> {
    return orderItemModule.findByPk(id, getOrderItemParams());
  }

  public createOrderItem(orderItem: IOrderItemDto): Promise<IOrderItemDto> {
    return orderItemModule.create(orderItem as any);
  }

  public async updateById(
    id: number,
    data: IOrderItemDto,
  ): Promise<IOrderItemDto[]> {
    const result = await orderItemModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteByOrderId(orderId: number): Promise<number> {
    return orderItemModule.destroy({
      where: { orderId: orderId },
    });
  }

  public deleteById(id: number): Promise<number> {
    return orderItemModule.destroy({
      where: { id: id },
    });
  }
}
