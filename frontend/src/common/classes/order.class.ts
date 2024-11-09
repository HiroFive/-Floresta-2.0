import { OrderStatusEnum } from '../enums';

export abstract class BaseOrder {
  constructor(
    public status: OrderStatusEnum = OrderStatusEnum.Created,
    public id: number = 0,
    public markerId: number = 0,
    public type?: string,
  ) {}
}

export class Order extends BaseOrder {}
