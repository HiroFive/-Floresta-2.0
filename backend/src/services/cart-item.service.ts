import { ICartItem } from '~/common/interfaces';
import { cartItemRepository } from '~/data/repositories';

export class CartItemService {
  public getById(id: number): Promise<ICartItem> {
    return cartItemRepository.getById(id);
  }
  public createCartItem(cartItemDto: ICartItem): Promise<ICartItem> {
    return cartItemRepository.createCartItem(cartItemDto);
  }

  public updateCartItem(
    id: number,
    cartItemDto: ICartItem,
  ): Promise<ICartItem[]> {
    return cartItemRepository.updateById(id, cartItemDto);
  }

  public deleteCartById(id: number): Promise<number> {
    return cartItemRepository.deleteCartById(id);
  }

  public deleteById(ids: Array<number>): Promise<number> {
    return cartItemRepository.delete(ids);
  }
}
