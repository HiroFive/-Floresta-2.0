import { createSelector } from '@ngrx/store';

export const selectUserState = (state: any) => state.product;

export const getAllProducts = createSelector(
  selectUserState,
  (state: any) => state?.allProducts,
);
