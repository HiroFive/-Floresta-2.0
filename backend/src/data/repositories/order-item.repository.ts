import { orderItemModule } from '../models';
import { getOrderItemParams } from '../atributes';
import { IOrderItem } from '~/common/interfaces';

export class OrderItemRepository {
  public getById(id: number): Promise<IOrderItem | null> {
    return orderItemModule.findByPk(id, getOrderItemParams());
  }
}
