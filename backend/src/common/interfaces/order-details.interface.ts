import { IPaymentDetails } from './payment-details.interface';
import { IProductDto } from './product.interface';

export interface IOrderDetailsDto {
  id?: number;
  total: string;
  userId: string;
  paymentId?: number;
  mapMarkerId: number;
  isAnonymous: boolean;
  status: string;
}

export interface IOrderDetails {
  id?: number;
  isAnonymous: boolean;
  user?: { id: number; name: string };
  items: Array<IProductDto>;
  status: number;
  createdAt: string;
  mapMarkerId: number;
  paymentDetails: IPaymentDetails;
  total: string;
}
