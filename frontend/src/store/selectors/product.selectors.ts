import { createSelector } from '@ngrx/store';

export const selectProductState = (state: any) => state.product;

export const getAllProducts = createSelector(
  selectProductState,
  (state: any) => state?.allProducts,
);

export const getProductsCatalog = createSelector(
  selectProductState,
  (state: any) => state?.productsCatalog,
);
