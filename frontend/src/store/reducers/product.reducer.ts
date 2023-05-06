import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../common/interfaces';
import { ProductActions } from '../actions';

type productState = {
  allProducts: Array<IProduct>;
  productsCatalog: Array<IProduct>;
};
export const productInitialState: productState = {
  allProducts: [],
  productsCatalog: [],
};

const productActionReducer = createReducer(
  productInitialState,
  on(ProductActions.getAllProductsSuccess, (state, action) => ({
    ...state,
    allProducts: action.products,
  })),
  on(ProductActions.updateProductSuccess, (state, action) => {
    let products = [...state.allProducts];

    return {
      ...state,
      allProducts: products.map((element) =>
        element.id !== action.product.id ? element : action.product,
      ),
    };
  }),
  on(ProductActions.deleteProductByIdSuccess, (state, action) => {
    const products = [...state.allProducts];
    const indexToDelete = products.findIndex(
      (element) => element.id === action.id,
    );

    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
    }

    return { ...state, allProducts: products };
  }),
  on(ProductActions.updateProductVisibility, (state, action) => {
    let allProducts = [...state.allProducts];

    return {
      ...state,
      allProducts: allProducts.map((element) =>
        element.id !== action.id
          ? element
          : {
              ...element,
              hidden: action.isHidden,
            },
      ),
    };
  }),
  on(ProductActions.getCatalogSuccess, (state, action) => ({
    ...state,
    productsCatalog: action.productsCatalog,
  })),
);

export const productReducer = { product: productActionReducer };
