import { UserRoles } from '../enums';

export abstract class BaseUser {
  constructor(
    public id: string = '',
    public subId: string,
    public email: string,
    public name: string,
    public role?: UserRoles | string,
  ) {}
}

export class User extends BaseUser {}
