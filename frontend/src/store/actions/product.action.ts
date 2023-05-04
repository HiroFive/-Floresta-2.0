import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../common/interfaces';

export const getAllProduct = createAction('[Product] get Products');
export const getAllProductsSuccess = createAction(
  '[Product] get Products Success',
  props<{ products: Array<IProduct> }>(),
);
export const getAllProductsFailed = createAction(
  '[Product] get Products Failed',
);

export const createProduct = createAction(
  '[Product] create Map Marker',
  props<{ product: any }>(),
);
export const createProductSuccess = createAction(
  '[Product] create Map Marker Success',
  props<{ product: any }>(),
);
export const createProductFailed = createAction(
  '[Product] create Map Marker Failed',
);

export const updateProduct = createAction(
  '[Product] update Product',
  props<{ id: number; product: IProduct }>(),
);
export const updateProductSuccess = createAction(
  '[Product] update Product Success',
  props<{ product: IProduct }>(),
);
export const updateProductFailed = createAction(
  '[Product] update Product Failed',
);

export const updateProductVisibility = createAction(
  '[Product] update Product Visibility',
  props<{ id: number; isHidden: boolean }>(),
);
export const updateProductVisibilitySuccess = createAction(
  '[Product] update Product Visibility Success',
  props<{ id: number; isHidden: boolean }>(),
);
export const updateProductVisibilityFailed = createAction(
  '[Product] update Product Visibility Failed',
);

export const deleteProductById = createAction(
  '[Product] delete Product',
  props<{ id: number }>(),
);
export const deleteProductByIdSuccess = createAction(
  '[Product] delete Product Success',
  props<{ id: number }>(),
);
export const deleteProductByIdFailed = createAction(
  '[Product] delete Product Failed',
);
