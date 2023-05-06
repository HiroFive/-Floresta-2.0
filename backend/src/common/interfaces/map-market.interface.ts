import { IProduct } from '~/common/interfaces/product.interface';

export interface IMapMarker {
  id: number;
  hidden: boolean;
  lat: number;
  lng: number;
  productIds: Array<number>;
}
export interface IMapMarkerWithProductInfo
  extends Omit<IMapMarker, 'productIds'> {
  products: Array<IProduct>;
}
