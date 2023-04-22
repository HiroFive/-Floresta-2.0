import { cartItemModule } from '../models';
import { getCartItemParams } from '../atributes';
import { ICartItem } from '~/common/interfaces';

class CartItemRepository {
  public getById(id: number): Promise<ICartItem | null> {
    return cartItemModule.findByPk(id, getCartItemParams());
  }
}

export { CartItemRepository };
