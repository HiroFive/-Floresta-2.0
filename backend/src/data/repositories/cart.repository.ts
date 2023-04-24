import { cartModule } from '../models';
import { getCartParams } from '../atributes';
import { ICart } from '~/common/interfaces';

class CartRepository {
  public getById(id: number): Promise<ICart | null> {
    return cartModule.findByPk(id, getCartParams());
  }

  public createCart(cartDto: ICart): Promise<ICart> {
    return cartModule.create(cartDto as any);
  }

  public getByUserId(userId: string): Promise<ICart> {
    return cartModule.findOne(getCartParams('filter', { userId }));
  }
}

export { CartRepository };
