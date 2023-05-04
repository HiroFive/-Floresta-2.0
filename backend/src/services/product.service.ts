import { productRepository } from '../data/repositories';
import { IProduct } from '~/common/interfaces';

export class ProductService {
  public getAllProducts(): Promise<IProduct[]> {
    return productRepository.getAll();
  }
  public getById(id: number): Promise<IProduct> {
    return productRepository.getById(id);
  }
  public createNewProduct(product: IProduct): Promise<IProduct> {
    return productRepository.createProduct(product);
  }

  public async updateProduct(
    id: string,
    data: IProduct,
  ): Promise<Array<IProduct>> {
    return productRepository.updateById(id, data);
  }

  public deleteProduct(id: string): Promise<number> {
    return productRepository.deleteById(id);
  }
}
