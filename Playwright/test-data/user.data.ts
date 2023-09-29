import { USER_EMAIL, USER_NAME, USER_PASSWORD } from '../../global-setup';
import { UserLoginModel, UserNameModel } from '../models/user.model';

export const UserLoginModelData: UserLoginModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};
export const UserData: UserNameModel = {
  userName: USER_NAME,
};
