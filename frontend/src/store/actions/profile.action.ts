import { createAction, props } from '@ngrx/store';
import { IUser } from '../../common/interfaces';

export const getProfileInfoById = createAction('[User] get User Info', props<{ id: string }>());
export const getProfileInfoByIdSuccess = createAction('[User] get User Info Success', props<{ user: IUser }>());
export const getProfileInfoByIdFailed = createAction('[User] get User Info Failed');

export const createUserProfile = createAction('[User] create User profile', props<{ user: IUser }>());
export const createUserProfileSuccess = createAction('[User] create User profile Success', props<{ user: IUser }>());
export const createUserProfileFailed = createAction('[User] create User profile Failed');
