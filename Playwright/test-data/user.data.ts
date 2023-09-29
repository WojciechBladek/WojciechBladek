import { UserLoginModel, UserNameModel } from '../models/user.model';

export const UserLoginModelData: UserLoginModel = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
export const UserData: UserNameModel = {
  userName: process.env.USER_NAME ?? '[NOT SET]',
};
