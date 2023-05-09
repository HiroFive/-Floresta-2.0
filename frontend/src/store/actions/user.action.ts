import { createAction, props } from '@ngrx/store';
import { IUser, IUserRoles } from '../../common/interfaces';

export const getAllUsers = createAction('[User] get User Info');
export const getAllUsersSuccess = createAction(
  '[User] get User Info Success',
  props<{ users: Array<IUser> }>(),
);
export const getAllUsersFailed = createAction('[User] get User Info Failed');

export const updateUser = createAction(
  '[User] update User',
  props<{ id: string; user: IUser }>(),
);
export const updateUserSuccess = createAction(
  '[User] update User Success',
  props<{ user: IUser }>(),
);
export const updateUserFailed = createAction('[User] update User Failed');

export const getUserRoles = createAction('[User] get User roles');
export const getUserRolesSuccess = createAction(
  '[User] get User roles Success',
  props<{ userRoles: Array<IUserRoles> }>(),
);
export const getUserRolesUsersFailed = createAction(
  '[User] get User roles Failed',
);

export const deleteUserById = createAction(
  '[User] delete-dialog User',
  props<{ id: string }>(),
);
export const deleteUserByIdSuccess = createAction(
  '[User] delete-dialog User Success',
  props<{ id: string }>(),
);
export const deleteUserByIdFailed = createAction(
  '[User] delete-dialog User Failed',
);
