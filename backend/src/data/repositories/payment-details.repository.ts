import { paymentDetailModule } from '../models';
import { getPaymentDetailsParams } from '../atributes';
import { IPaymentDetailsDto } from '~/common/interfaces';

export class PaymentDetailsRepository {
  public getById(id: number): Promise<IPaymentDetailsDto | null> {
    return paymentDetailModule.findByPk(id, getPaymentDetailsParams());
  }

  public createPayment(
    paymentDetails: IPaymentDetailsDto,
  ): Promise<IPaymentDetailsDto | null> {
    return paymentDetailModule.create(paymentDetails as any);
  }

  public deleteByOrderId(orderId: number): Promise<number> {
    return paymentDetailModule.destroy({ where: { orderId: orderId } });
  }
}
