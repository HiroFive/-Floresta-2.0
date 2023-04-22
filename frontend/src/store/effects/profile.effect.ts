import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services';
import { ProfileActions } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

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
