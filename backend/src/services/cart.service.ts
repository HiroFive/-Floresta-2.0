import { ICart } from '~/common/interfaces';
import { cartRepository } from '~/data/repositories';

class CartService {
  public getById(id: number): Promise<ICart> {
    return cartRepository.getById(id);
  }
  public createCartByUserId(userId: string): Promise<ICart> {
    return cartRepository.createCart({
      id: 1,
      userId,
      productIds: [],
    });
  }

  public getCartByUserId(userId: string): Promise<ICart> {
    return cartRepository.getByUserId(userId);
  }
}

export { CartService };
