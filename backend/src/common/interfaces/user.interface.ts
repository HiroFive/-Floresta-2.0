export interface IUserDto {
  id?: string;
  name: string;
  email: string;
  subId: string;
  role: number;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  subId: string;
  role: { name: string };
}
