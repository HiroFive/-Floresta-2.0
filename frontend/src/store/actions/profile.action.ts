import { createAction, props } from '@ngrx/store';
import { IOrderDetails, IUser } from '../../common/interfaces';

export const getProfileInfoById = createAction(
  '[Profile] get User Info',
  props<{ id: string }>(),
);
export const getProfileInfoByIdSuccess = createAction(
  '[Profile] get User Info Success',
  props<{ user: IUser }>(),
);
export const getProfileInfoByIdFailed = createAction(
  '[Profile] get User Info Failed',
);

export const createUserProfile = createAction(
  '[Profile] create User profile-page',
  props<{ user: IUser }>(),
);
export const createUserProfileSuccess = createAction(
  '[Profile] create User profile-page Success',
  props<{ user: IUser }>(),
);
export const createUserProfileFailed = createAction(
  '[Profile] create User profile-page Failed',
);

export const getOrderHistory = createAction('[Profile] get order history');
export const getOrderHistorySuccess = createAction(
  '[Profile] get order history Success',
  props<{ orderHistory: Array<IOrderDetails> }>(),
);
export const getOrderHistoryFailed = createAction(
  '[Profile] get order history Failed',
);
