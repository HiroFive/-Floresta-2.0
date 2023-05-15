import { createSelector } from '@ngrx/store';

export const selectProfileState = (state: any) => state.profile;

export const getProfile = createSelector(selectProfileState, (state: any) => ({
  id: state.id,
  name: state.name,
  email: state.email,
  subId: state.subId,
  role: state.role,
}));

export const getOrderHistory = createSelector(
  selectProfileState,
  (state: any) => state.orderHistory,
);
