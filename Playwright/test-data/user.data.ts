import { UserLogin, UserName } from '../models/user.model';

export const UserLoginData: UserLogin = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
export const UserData: UserName = {
  userName: process.env.USER_NAME ?? '[NOT SET]',
};
