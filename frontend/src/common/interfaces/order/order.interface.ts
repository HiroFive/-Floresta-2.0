import { IPaymentDetails } from './order-payment.interface';
import { PaymentProvideEnum } from '../../enums';

export interface IOrderDetails {
  id?: number;
  isAnonymous: boolean;
  user: { id: number; name: string };
  mapMarkerId: number;
  items: Array<IOrderItem>;
  paymentDetails: IPaymentDetails;
  total: string;
  status: number;
  createdAt: string;
  type?: string;
}

export interface IOrderDto {
  isAnonymous: boolean;
  mapMarkerId: number;
  items: Array<{ id: number; name: string; quantity: number }>;
  total: number;
  payment: { provider: PaymentProvideEnum };
  type?: string;
}

export interface IOrderItem {
  id: number;
  name: string;
  image: string;
  hidden: boolean;
  price: number;
  quantity: number;
  productId: number;
}
