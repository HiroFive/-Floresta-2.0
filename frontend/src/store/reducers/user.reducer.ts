import { createReducer, on } from '@ngrx/store';
import { IUser, IUserRoles } from '../../common/interfaces';
import { UserActions } from '../actions';

type userState = {
  users: Array<IUser>;
  roles: Array<IUserRoles>;
};
export const userInitialState: userState = {
  users: [],
  roles: [],
};

const userActionReducer = createReducer(
  userInitialState,
  on(UserActions.getAllUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
  })),
  on(UserActions.deleteUserByIdSuccess, (state, action) => {
    const users = [...state.users];
    const indexToDelete = users.findIndex(
      (element) => element.id === action.id,
    );

    if (indexToDelete !== -1) {
      users.splice(indexToDelete, 1);
    }

    return { ...state, users };
  }),
  on(UserActions.getUserRolesSuccess, (state, action) => ({
    ...state,
    roles: action.userRoles,
  })),

  on(UserActions.updateUserSuccess, (state, action) => {
    let users = [...state.users];

    return {
      ...state,
      users: users.map((element) =>
        element.id !== action.user.id ? element : action.user,
      ),
    };
  }),
);

export const userReducer = { user: userActionReducer };
