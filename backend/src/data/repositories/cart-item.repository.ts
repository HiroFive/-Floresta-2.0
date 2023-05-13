import { cartItemModule } from '../models';
import { getCartItemParams } from '../atributes';
import { ICartItemDto } from '~/common/interfaces';

export class CartItemRepository {
  public getById(id: number): Promise<ICartItemDto | null> {
    return cartItemModule.findByPk(id, getCartItemParams());
  }

  public createCartItem(cartItemDto: ICartItemDto): Promise<ICartItemDto> {
    return cartItemModule.create(cartItemDto as any);
  }

  public async updateById(
    id: number,
    cartItemDto: ICartItemDto,
  ): Promise<ICartItemDto[]> {
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
