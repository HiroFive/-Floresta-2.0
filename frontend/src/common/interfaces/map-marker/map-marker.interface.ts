import { IProduct } from '../product/product.interface';

export interface IMapMarker {
  id?: number;
  name: string;
  description?: string;
  hidden: boolean;
  lat: number;
  lng: number;
  productIds: Array<number>;
}

export interface IMapMarkerWithProductInfo
  extends Omit<IMapMarker, 'productIds'> {
  products: Array<IProduct>;
}
