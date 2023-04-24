import { UserRoles } from '../../enums';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  subId: string;
  role?: UserRoles;
}
