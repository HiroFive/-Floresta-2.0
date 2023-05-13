import { productRepository } from '../data/repositories';
import { IProductDto } from '~/common/interfaces';

export class ProductService {
  public getAllProducts(): Promise<IProductDto[]> {
    return productRepository.getAll();
  }
  public getById(id: number): Promise<IProductDto> {
    return productRepository.getById(id);
  }
  public createNewProduct(product: IProductDto): Promise<IProductDto> {
    return productRepository.createProduct(product);
  }

  public async updateProduct(
    id: number,
    data: IProductDto,
  ): Promise<Array<IProductDto>> {
    return productRepository.updateById(id, data);
  }

  public deleteProduct(id: number): Promise<number> {
    return productRepository.deleteById(id);
  }
}
