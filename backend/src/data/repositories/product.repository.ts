import { productModule } from '../models';
import { getProductParams } from '../atributes';
import { IProduct } from '~/common/interfaces';

class ProductRepository {
  public getById(id: number): Promise<IProduct | null> {
    return productModule.findByPk(id, getProductParams());
  }
}

export { ProductRepository };
