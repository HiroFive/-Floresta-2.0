import { createReducer, on } from '@ngrx/store';
import { CartActions } from '../actions';
import { ICartItem } from '../../common/interfaces';

type cartState = {
  id?: number | null;
  items: Array<ICartItem> | null;
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
  on(CartActions.updateCartItemSuccess, (state, action) => {
    let items = [...(state?.items || [])];

    return {
      ...state,
      items: items.map((element) =>
        element.id !== action.id
          ? element
          : {
              ...element,
              quantity: action.quantity,
            },
      ),
    };
  }),

  on(CartActions.deleteCartItemByIdSuccess, (state, action) => {
    const items = [...(state?.items || [])];
    const newItemsArray = items.filter((item) => !action.ids.includes(item.id));

    return { ...state, items: newItemsArray };
  }),
);

export const cartReducer = { cart: cartActionReducer };
