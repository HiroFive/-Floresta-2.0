import { ICart, ICartFullInfo } from '~/common/interfaces';
import { cartRepository } from '~/data/repositories';
import { cartMapper } from '~/utils/cart.mapper';

export class CartService {
  public getById(id: number): Promise<ICart> {
    return cartRepository.getById(id);
  }
  public createCartByUserId(userId: string): Promise<ICart> {
    return cartRepository.createCart({
      userId,
      productIds: [],
    });
  }

  public getCartByUserId(userId: string): Promise<ICartFullInfo> {
    return new Promise(async (resolve, reject) => {
      try {
        const cart = cartMapper(
          (await cartRepository.getByUserId(userId)) as any,
        );

        resolve(cart);
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteCartById(id: number): Promise<number> {
    return cartRepository.deleteByUserId(id);
  }
}
