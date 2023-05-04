import { UserRolesEnum } from '../enums';

export abstract class BaseUser {
  constructor(
    public id: string = '',
    public subId: string,
    public email: string,
    public name: string,
    public role?: UserRolesEnum | string,
  ) {}
}

export class User extends BaseUser {}
