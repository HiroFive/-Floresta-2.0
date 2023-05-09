import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  CartItemService,
  CartService,
  LocalStorageService,
} from '../../services';
import { CartActions } from '../actions';
import { of } from 'rxjs';
import { ICartItem } from '../../common/interfaces';
import { USER_PROFILE } from '../../common/local-storage-keys';
import { Store } from '@ngrx/store';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private cartItemService: CartItemService,
    private readonly store: Store<any>,
    private readonly localStorageService: LocalStorageService,
  ) {}

  getCartByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartByUserId),
      mergeMap((action) =>
        this.cartService.getCartByUserId(action.id).pipe(
          map((cart) => CartActions.getCartByUserIdSuccess({ cart })),
          catchError(() => of(CartActions.getCartByUserIdFailed())),
        ),
      ),
    ),
  );

  createCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createCartItem),
      mergeMap((action) =>
        this.cartItemService
          .createCartItem(action.cartItem.productId, action.cartItem.cartId, {
            quantity: action.cartItem.quantity || 1,
          } as ICartItem)
          .pipe(
            map(() => CartActions.createCartItemSuccess()),
            tap(() => {
              const userId = JSON.parse(
                this.localStorageService.getItem(USER_PROFILE) || {},
              )?.id;

              this.store.dispatch(CartActions.getCartByUserId({ id: userId }));
            }),
            catchError(() => of(CartActions.createCartItemFailed())),
          ),
      ),
    ),
  );

  updateCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartItem),
      mergeMap((action) =>
        this.cartItemService
          .updateCartItem(action.id, {
            quantity: action.cartItem.quantity,
          } as ICartItem)
          .pipe(
            map(() =>
              CartActions.updateCartItemSuccess({
                id: action.id,
                quantity: action.cartItem.quantity,
              }),
            ),
            catchError(() => of(CartActions.updateCartItemFailed())),
          ),
      ),
    ),
  );

  deleteCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCartItemById),
      mergeMap((action) =>
        this.cartItemService.deleteCartItem(action.ids).pipe(
          map(() =>
            CartActions.deleteCartItemByIdSuccess({
              ids: action.ids,
            }),
          ),
          catchError(() => of(CartActions.deleteCartItemByIdFailed())),
        ),
      ),
    ),
  );

  deleteCartByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCartByUserId),
      mergeMap((action) =>
        this.cartService.deleteCartByUserId(action.id).pipe(
          map((cart) => CartActions.deleteCartByUserIdSuccess()),
          catchError(() => of(CartActions.deleteCartByUserIdFailed())),
        ),
      ),
    ),
  );
}
