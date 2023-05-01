import { createSelector } from '@ngrx/store';

export const selectUserState = (state: any) => state.user;

export const getAllUsers = createSelector(
  selectUserState,
  (state: any) => state?.users,
);

export const getUserRoles = createSelector(
  selectUserState,
  (state: any) => state?.roles,
);
