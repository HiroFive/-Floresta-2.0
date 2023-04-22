import { cartModule } from '../models';
import { getCartParams } from '../atributes';
import { ICart } from '~/common/interfaces';

class CartRepository {
  public getById(id: number): Promise<ICart | null> {
    return cartModule.findByPk(id, getCartParams());
  }
}

export { CartRepository };
