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

export const deleteCartByUserId = createAction(
  '[Cart] delete Cart by user id',
  props<{ id: string }>(),
);
export const deleteCartByUserIdSuccess = createAction(
  '[Cart] delete Cart by user id Success',
);
export const deleteCartByUserIdFailed = createAction(
  '[Cart] delete Cart by user id Failed',
);
