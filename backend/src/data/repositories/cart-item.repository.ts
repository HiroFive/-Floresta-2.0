import { cartItemModule } from '../models';
import { getCartItemParams } from '../atributes';
import { ICartItem } from '~/common/interfaces';

export class CartItemRepository {
  public getById(id: number): Promise<ICartItem | null> {
    return cartItemModule.findByPk(id, getCartItemParams());
  }

  public createCartItem(cartItemDto: ICartItem): Promise<ICartItem> {
    return cartItemModule.create(cartItemDto as any);
  }

  public async updateById(
    id: number,
    cartItemDto: ICartItem,
  ): Promise<ICartItem[]> {
    const result = await cartItemModule.update(cartItemDto, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public delete(id: Array<number>): Promise<number> {
    return cartItemModule.destroy({
      where: { id: id },
    });
  }

  public deleteCartById(id: number): Promise<number> {
    return cartItemModule.destroy({
      where: { cartId: id },
    });
  }
}
