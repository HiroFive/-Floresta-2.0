import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from '../actions';
import { IOrderDetails } from '../../common/interfaces';
import { UserRolesEnum } from '../../common/enums';

type profileState = {
  id?: string | null;
  name: string | null;
  email: string | null;
  subId: string | null;
  role: UserRolesEnum | null;
  orderHistory: Array<IOrderDetails>;
};
export const profileInitialState: profileState = {
  id: null,
  name: null,
  email: null,
  subId: null,
  role: null,
  orderHistory: [],
};

const profileActionReducer = createReducer(
  profileInitialState,
  on(ProfileActions.getProfileInfoByIdSuccess, (state, action) => ({
    ...state,
    id: action.user?.id,
    name: action.user?.name,
    email: action.user?.email,
    subId: action.user?.subId,
    role: action.user?.role as any,
  })),
  on(ProfileActions.getOrderHistorySuccess, (state, action) => ({
    ...state,
    orderHistory: action.orderHistory,
  })),
);

export const profileReducer = { profile: profileActionReducer };
