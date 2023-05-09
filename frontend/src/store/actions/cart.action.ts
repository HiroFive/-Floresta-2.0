import { createAction, props } from '@ngrx/store';
import { ICart } from '../../common/interfaces';

export const getCartByUserId = createAction(
  '[Cart] get Cart by user id',
  props<{ id: string }>(),
);
export const getCartByUserIdSuccess = createAction(
  '[Cart] get Cart by user id Success',
  props<{ cart: ICart }>(),
);
export const getCartByUserIdFailed = createAction(
  '[Cart] get Cart by user id Failed',
);

export const createCartItem = createAction(
  '[Cart] create Cart Item',
  props<{
    cartItem: { quantity?: number | null; productId: number; cartId: number };
  }>(),
);
export const createCartItemSuccess = createAction(
  '[Cart] create Cart Item Success',
);
export const createCartItemFailed = createAction(
  '[Cart] create Cart Item Failed',
);

export const updateCartItem = createAction(
  '[Cart] update Cart Item',
  props<{ id: number; cartItem: { quantity: number } }>(),
);
export const updateCartItemSuccess = createAction(
  '[Cart] update Cart Item Success',
  props<{ id: number; quantity: number }>(),
);
export const updateCartItemFailed = createAction(
  '[Cart] update Cart Item Failed',
);

export const deleteCartItemById = createAction(
  '[Cart] delete-dialog Cart Item',
  props<{ ids: Array<number> }>(),
);
export const deleteCartItemByIdSuccess = createAction(
  '[Cart] delete-dialog Cart Item Success',
  props<{ ids: Array<number> }>(),
);
export const deleteCartItemByIdFailed = createAction(
  '[Cart] delete-dialog Cart Item Failed',
);

export const deleteCartByUserId = createAction(
  '[Cart] delete-dialog Cart by user id',
  props<{ id: string }>(),
);
export const deleteCartByUserIdSuccess = createAction(
  '[Cart] delete-dialog Cart by user id Success',
);
export const deleteCartByUserIdFailed = createAction(
  '[Cart] delete-dialog Cart by user id Failed',
);
