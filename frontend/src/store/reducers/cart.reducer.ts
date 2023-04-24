import { createReducer, on } from '@ngrx/store';
import { CartActions } from '../actions';

type cartState = {
  id?: number | null;
  items: Array<any> | null;
};
export const cartInitialState: cartState = {
  id: null,
  items: null,
};

const cartActionReducer = createReducer(
  cartInitialState,
  on(
    CartActions.getCartByUserIdSuccess,
    (state, action) => (state = action.cart),
  ),
);

export const cartReducer = { cart: cartActionReducer };
