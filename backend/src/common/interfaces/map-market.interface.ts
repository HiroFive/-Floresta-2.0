import { IProductDto } from '~/common/interfaces/product.interface';

export interface IMapMarkerDto {
  id: number;
  hidden: boolean;
  lat: number;
  lng: number;
  productIds: Array<number>;
}
export interface IMapMarkerWithProductInfo
  extends Omit<IMapMarkerDto, 'productIds'> {
  products: Array<IProductDto>;
}
