import { orderDetailsModule } from '../models';
import { getOrderDetailsParams } from '../atributes';
import { IOrderDetailsDto } from '~/common/interfaces';
import { ParamsTypeEnum } from '~/common/enums';

export class OrderDetailsRepository {
  public getById(id: number): Promise<IOrderDetailsDto | null> {
    return orderDetailsModule.findByPk(id, getOrderDetailsParams());
  }

  public getAll(): Promise<Array<IOrderDetailsDto>> {
    return orderDetailsModule.findAll(getOrderDetailsParams());
  }

  public getAllByUserId(userId: string): Promise<Array<IOrderDetailsDto>> {
    return orderDetailsModule.findAll(
      getOrderDetailsParams(ParamsTypeEnum.Filter, { userId: userId }),
    );
  }

  public createOrder(newOrder: IOrderDetailsDto): Promise<IOrderDetailsDto> {
    return orderDetailsModule.create(newOrder as any);
  }

  public async updateById(id: number, data: any): Promise<IOrderDetailsDto[]> {
    const result = await orderDetailsModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteByIds(id: Array<number>): Promise<number> {
    return orderDetailsModule.destroy({
      where: { id },
    });
  }
}
