import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from '../../services';
import { CartActions } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  getCartByUserIdId$ = createEffect(() =>
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
}
