import { paymentDetailModule } from '../models';
import { getPaymentDetailsParams } from '../atributes';
import { IPaymentDetails } from '~/common/interfaces';

class PaymentDetailsRepository {
  public getById(id: number): Promise<IPaymentDetails | null> {
    return paymentDetailModule.findByPk(id, getPaymentDetailsParams());
  }
}

export { PaymentDetailsRepository };
