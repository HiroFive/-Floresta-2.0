import { IPaymentDetailsDto } from '~/common/interfaces';
import { paymentDetailsRepository } from '~/data/repositories';

export class PaymentService {
  public getById(id: number): Promise<IPaymentDetailsDto> {
    return paymentDetailsRepository.getById(id);
  }

  public createPayment(
    paymentDetails: IPaymentDetailsDto,
  ): Promise<IPaymentDetailsDto> {
    return paymentDetailsRepository.createPayment(paymentDetails);
  }

  public deleteByOrderId(orderId: number): Promise<number> {
    return paymentDetailsRepository.deleteByOrderId(orderId);
  }
}
