import { productModule } from '../models';
import { getProductParams } from '../atributes';
import { IProduct } from '~/common/interfaces';

export class ProductRepository {
  public getById(id: number): Promise<IProduct | null> {
    return productModule.findByPk(id, getProductParams());
  }

  public getAll(): Promise<Array<IProduct>> {
    return productModule.findAll(getProductParams());
  }

  public createProduct(product: any): Promise<IProduct> {
    return productModule.create(product);
  }

  public async updateById(
    id: string,
    data: IProduct,
  ): Promise<Array<IProduct>> {
    const result = await productModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: string): Promise<number> {
    return productModule.destroy({
      where: { id },
    });
  }
}
