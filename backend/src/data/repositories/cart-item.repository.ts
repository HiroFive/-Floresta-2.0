import { cartItemModule } from '../models';
import { getCartItemParams } from '../atributes';
import { ICartItem } from '~/common/interfaces';

export class CartItemRepository {
  public getById(id: number): Promise<ICartItem | null> {
    return cartItemModule.findByPk(id, getCartItemParams());
  }
}
