import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from '../actions';

type profileState = {
  id?: string | null;
  name: string | null;
  email: string | null;
  subId: string | null;
};
export const profileInitialState: profileState = {
  id: null,
  name: null,
  email: null,
  subId: null,
};

const profileActionReducer = createReducer(
  profileInitialState,
  on(ProfileActions.getProfileInfoByIdSuccess, (state, action) => (state = action.user)),
);

export const profileReducer = { profile: profileActionReducer };
