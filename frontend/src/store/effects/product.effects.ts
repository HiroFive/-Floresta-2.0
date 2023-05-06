import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MapMarketService, ModalService, ProductService } from '../../services';
import { ProductActions } from '../actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly store: Store<any>,
    private actions$: Actions,
    private readonly productService: ProductService,
    private readonly modalService: ModalService,
    private readonly mapMarketService: MapMarketService,
  ) {}

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProduct),
      mergeMap((action) =>
        this.productService.getAllProducts().pipe(
          map((products) => ProductActions.getAllProductsSuccess({ products })),
          catchError(() => of(ProductActions.getAllProductsFailed())),
        ),
      ),
    ),
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((newProduct) =>
            ProductActions.createProductSuccess({ product: newProduct }),
          ),
          tap(() => {
            this.store.dispatch(ProductActions.getAllProduct());
          }),
          catchError(() => of(ProductActions.createProductFailed())),
        ),
      ),
    ),
  );

  updateProductVisibility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductVisibility),
      mergeMap(({ id, isHidden }) =>
        this.productService.updateProductVisibility(id, isHidden).pipe(
          map(() =>
            ProductActions.updateProductVisibilitySuccess({ id, isHidden }),
          ),
          catchError(() => of(ProductActions.updateProductVisibilityFailed())),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) =>
        this.productService.updateProductById(action?.id, action?.product).pipe(
          map((product) => {
            this.modalService.changeOpenState(false);
            return ProductActions.updateProductSuccess({ product });
          }),
          tap(() => {
            this.store.dispatch(ProductActions.getAllProduct());
          }),
          catchError(() => of(ProductActions.updateProductFailed())),
        ),
      ),
    ),
  );

  deleteProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductById),
      mergeMap(({ id }) =>
        this.productService.deleteProductById(id).pipe(
          map(() => ProductActions.deleteProductByIdSuccess({ id })),
          catchError(() => of(ProductActions.deleteProductByIdFailed())),
        ),
      ),
    ),
  );

  getProductsCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getCatalog),
      mergeMap(({ id }) =>
        this.mapMarketService.getMarkerProducts(id).pipe(
          map((markerWithProductInfo) =>
            ProductActions.getCatalogSuccess({
              productsCatalog: markerWithProductInfo.products,
            }),
          ),
          catchError(() => of(ProductActions.getCatalogFailed())),
        ),
      ),
    ),
  );
}
