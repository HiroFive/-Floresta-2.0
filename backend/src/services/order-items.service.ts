import { IOrderItemDto } from '~/common/interfaces';
import { orderItemRepository } from '~/data/repositories';

export class OrderItemsService {
  public getById(orderId: number): Promise<IOrderItemDto> {
    return orderItemRepository.getById(orderId);
  }

  public createOrderItem(orderItem: IOrderItemDto): Promise<IOrderItemDto> {
    return orderItemRepository.createOrderItem(orderItem);
  }

  public async updateOrderItem(
    id: number,
    data: IOrderItemDto,
  ): Promise<IOrderItemDto[]> {
    return orderItemRepository.updateById(id, data);
  }

  public deleteByOrderId(id: number): Promise<number> {
    return orderItemRepository.deleteByOrderId(id);
  }

  public deleteById(id: number): Promise<number> {
    return orderItemRepository.deleteById(id);
  }
}
