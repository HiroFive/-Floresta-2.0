import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderService, UserService } from '../../services';
import { ProfileActions } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  getProfileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfileInfoById),
      mergeMap((action) =>
        this.userService.getUserById(action.id).pipe(
          map((user) => ProfileActions.getProfileInfoByIdSuccess({ user })),
          catchError(() => of(ProfileActions.getProfileInfoByIdFailed())),
        ),
      ),
    ),
  );

  getOrderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getOrderHistory),
      mergeMap((action) =>
        this.orderService.getUserOrders().pipe(
          map((orderHistory) =>
            ProfileActions.getOrderHistorySuccess({ orderHistory }),
          ),
          catchError(() => of(ProfileActions.getOrderHistoryFailed())),
        ),
      ),
    ),
  );

  createUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.createUserProfile),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((user) => ProfileActions.createUserProfileSuccess({ user })),
          catchError(() => of(ProfileActions.createUserProfileFailed())),
        ),
      ),
    ),
  );
}
