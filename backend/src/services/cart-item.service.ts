import { ICartItemDto } from '~/common/interfaces';
import { cartItemRepository } from '~/data/repositories';

export class CartItemService {
  public getById(id: number): Promise<ICartItemDto> {
    return cartItemRepository.getById(id);
  }
  public createCartItem(cartItemDto: ICartItemDto): Promise<ICartItemDto> {
    return cartItemRepository.createCartItem(cartItemDto);
  }

  public updateCartItem(
    id: number,
    cartItemDto: ICartItemDto,
  ): Promise<ICartItemDto[]> {
    return cartItemRepository.updateById(id, cartItemDto);
  }

  public deleteCartById(id: number): Promise<number> {
    return cartItemRepository.deleteCartById(id);
  }

  public deleteById(ids: Array<number>): Promise<number> {
    return cartItemRepository.delete(ids);
  }
}
