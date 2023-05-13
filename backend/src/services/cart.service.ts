import { ICart, ICartFullInfo } from '~/common/interfaces';
import { cartRepository } from '~/data/repositories';
import { cartMapper } from '~/utils/cart.mapper';
import { cartItemService, cartService } from '~/services/index';

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

  public deleteCartByUserId(userId: string): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const cart = await cartService.getCartByUserId(userId);

        if (cart.id) {
          await cartService.createCartByUserId(userId);
          await cartRepository.deleteById(cart.id);
          await cartItemService.deleteCartById(cart.id);
        }

        resolve(0);
      } catch (error) {
        reject(error);
      }
    });
  }
}
