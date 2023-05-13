import { createAction, props } from '@ngrx/store';
import { IOrderDetails, IOrderDto } from '../../common/interfaces';

export const getOrderDetails = createAction(
  '[Order] get order details',
  props<{ orderNumber: number }>(),
);
export const getOrderDetailsSuccess = createAction(
  '[Order] get order detailsSuccess',
  props<{ orderDetails: IOrderDetails }>(),
);
export const getOrderDetailsFailed = createAction(
  '[Order] get order details Failed',
);

export const getAllOrderDetails = createAction('[Order] get all order details');
export const getAllOrderDetailsSuccess = createAction(
  '[Order] get all order detailsSuccess',
  props<{ allOrderDetails: Array<IOrderDetails> }>(),
);
export const getAllOrderDetailsFailed = createAction(
  '[Order] get all order details Failed',
);

export const createOrder = createAction(
  '[Order] create Order',
  props<{
    orderDto: IOrderDto;
  }>(),
);
export const createOrderSuccess = createAction('[Order] create Order Success');
export const createOrderFailed = createAction('[Order] create Order Failed');

export const updateOrderStatus = createAction(
  '[Order] update Order details',
  props<{ id: number; status: number }>(),
);
export const updateOrderStatusSuccess = createAction(
  '[Order] update Order details Success',
  props<{ id: number; status: number }>(),
);
export const updateOrderStatusFailed = createAction(
  '[Order] update Order details Failed',
);

export const createOrderItem = createAction(
  '[Order] create Order Item',
  props<{
    quantity?: number | null;
    productId: number;
    orderId: number;
  }>(),
);
export const createOrderItemSuccess = createAction(
  '[Order] create Order Item Success',
);
export const createOrderItemFailed = createAction(
  '[Order] create Order Item Failed',
);

export const updateOrderItem = createAction(
  '[Order] update Order Item',
  props<{ id: number; quantity: number; orderId: number }>(),
);
export const updateOrderItemSuccess = createAction(
  '[Order] update Order Item Success',
  props<{ id: number; quantity: number; orderId: number }>(),
);
export const updateOrderItemFailed = createAction(
  '[Order] update Order Item Failed',
);

export const deleteOrderItemById = createAction(
  '[Order] delete-dialog Order Item',
  props<{ id: number; orderId: number }>(),
);
export const deleteOrderItemByIdSuccess = createAction(
  '[Order] delete-dialog Order Item Success',
  props<{ id: number; orderId: number }>(),
);
export const deleteOrderItemByIdFailed = createAction(
  '[Order] delete-dialog Order Item Failed',
);
