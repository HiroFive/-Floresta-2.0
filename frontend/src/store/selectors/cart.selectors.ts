import { createSelector } from '@ngrx/store';

export const selectCartState = (state: any) => state.cart;

export const getCart = createSelector(selectCartState, (state: any) => state);
