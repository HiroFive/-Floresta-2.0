import { orderDetailsModule } from '../models';
import { getOrderDetailsParams } from '../atributes';
import { IOrderDetails } from '~/common/interfaces';

class OrderDetailsRepository {
  public getById(id: number): Promise<IOrderDetails | null> {
    return orderDetailsModule.findByPk(id, getOrderDetailsParams());
  }
}

export { OrderDetailsRepository };
