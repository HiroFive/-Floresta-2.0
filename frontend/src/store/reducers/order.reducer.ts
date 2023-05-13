import { createReducer, on } from '@ngrx/store';
import { OrderActions } from '../actions';
import { IOrderDetails } from '../../common/interfaces';

type orderState = {
  orderDetails: IOrderDetails | null;
  allOrderDetails: Array<IOrderDetails> | null;
};
export const orderInitialState: orderState = {
  orderDetails: null,
  allOrderDetails: null,
};

const orderActionReducer = createReducer(
  orderInitialState,
  on(OrderActions.getOrderDetailsSuccess, (state, action) => ({
    ...state,
    orderDetails: action.orderDetails,
  })),
  on(OrderActions.getAllOrderDetailsSuccess, (state, action) => ({
    ...state,
    allOrderDetails: action.allOrderDetails,
  })),
  on(OrderActions.updateOrderItemSuccess, (state, action) => {
    const orderDetailsArray = [...(state?.allOrderDetails || [])];
    const orderDetails = orderDetailsArray.find(
      (order) => order.id === action.orderId,
    );
    const arrayWithoutCurrentOrder = orderDetailsArray.filter(
      (order) => order.id !== action.orderId,
    );

    if (orderDetails?.id) {
      return {
        ...state,
        allOrderDetails: [
          ...arrayWithoutCurrentOrder,
          {
            ...orderDetails,
            items: orderDetails?.items.map((element) =>
              element.id !== action.id
                ? element
                : {
                    ...element,
                    quantity: action.quantity,
                  },
            ),
          },
        ] as Array<IOrderDetails>,
      };
    }
    return state;
  }),

  on(OrderActions.deleteOrderItemByIdSuccess, (state, action) => {
    const orderDetailsArray = [...(state?.allOrderDetails || [])];
    const orderDetails = orderDetailsArray.find(
      (order) => order.id === action.orderId,
    );
    const arrayWithoutCurrentOrder = orderDetailsArray.filter(
      (order) => order.id !== action.orderId,
    );

    if (orderDetails?.id) {
      return {
        ...state,
        allOrderDetails: [
          ...arrayWithoutCurrentOrder,
          {
            ...orderDetails,
            items: orderDetails?.items.filter(
              (element) => element.id !== action.id,
            ),
          },
        ] as Array<IOrderDetails>,
      };
    }
    return state;
  }),
);

export const orderReducer = { order: orderActionReducer };
