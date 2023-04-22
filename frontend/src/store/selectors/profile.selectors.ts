import { createSelector } from '@ngrx/store';

export const selectProfileState = (state: any) => state.profile;

export const getProfile = createSelector(selectProfileState, (state: any) => state);
