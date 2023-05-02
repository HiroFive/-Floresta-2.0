import { ICart } from '~/common/interfaces';
import { cartRepository } from '~/data/repositories';

class CartService {
  public getById(id: number): Promise<ICart> {
    return cartRepository.getById(id);
  }
  public createCartByUserId(userId: string): Promise<ICart> {
    return cartRepository.createCart({
      userId,
      productIds: [],
    });
  }

  public getCartByUserId(userId: string): Promise<ICart> {
    return cartRepository.getByUserId(userId);
  }

  public deleteCartById(id: number): Promise<number> {
    return cartRepository.deleteByUserId(id);
  }
}

export { CartService };
