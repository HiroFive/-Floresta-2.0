export interface IPaymentDetailsDto {
  id?: number;
  orderId: number;
  provider: string;
}

export interface IPaymentDetails {
  id: number;
  provider: string;
}
