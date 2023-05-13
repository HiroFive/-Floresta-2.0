import { createSelector } from '@ngrx/store';

export const selectOrderState = (state: any) => state.order;

export const getOrderDetails = createSelector(
  selectOrderState,
  (state: any) => state.orderDetails,
);

export const getAllOrderDetails = createSelector(
  selectOrderState,
  (state: any) => state.allOrderDetails,
);
