import { productModule } from '../models';
import { getProductParams } from '../atributes';
import { IProductDto } from '~/common/interfaces';

export class ProductRepository {
  public getById(id: number): Promise<IProductDto | null> {
    return productModule.findByPk(id, getProductParams());
  }

  public getAll(): Promise<Array<IProductDto>> {
    return productModule.findAll(getProductParams());
  }

  public createProduct(product: any): Promise<IProductDto> {
    return productModule.create(product);
  }

  public async updateById(
    id: number,
    data: IProductDto,
  ): Promise<Array<IProductDto>> {
    const result = await productModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: number): Promise<number> {
    return productModule.destroy({
      where: { id },
    });
  }
}
