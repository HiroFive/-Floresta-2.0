import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ModalService, UserService } from '../../services';
import { UserActions } from '../actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private readonly store: Store<any>,
    private actions$: Actions,
    private userService: UserService,
    private readonly modalService: ModalService,
  ) {}

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAllUsers),
      mergeMap((action) =>
        this.userService.getAllUsers().pipe(
          map((users) => UserActions.getAllUsersSuccess({ users })),
          catchError(() => of(UserActions.getAllUsersFailed())),
        ),
      ),
    ),
  );

  getUserRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserRoles),
      mergeMap((action) =>
        this.userService.getUserRoles().pipe(
          map((userRoles) => UserActions.getUserRolesSuccess({ userRoles })),
          catchError(() => of(UserActions.getUserRolesUsersFailed())),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action?.id, action?.user).pipe(
          map((user) => {
            this.modalService.changeOpenState(false);
            return UserActions.updateUserSuccess({ user });
          }),
          tap(() => {
            this.store.dispatch(UserActions.getAllUsers());
          }),
          catchError(() => of(UserActions.updateUserFailed())),
        ),
      ),
    ),
  );

  deleteUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUserById),
      mergeMap(({ id }) =>
        this.userService.deleteUserById(id).pipe(
          map(() => UserActions.deleteUserByIdSuccess({ id })),
          catchError(() => of(UserActions.deleteUserByIdFailed())),
        ),
      ),
    ),
  );
}
