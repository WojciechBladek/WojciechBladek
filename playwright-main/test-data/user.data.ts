import { USER_EMAIL, USER_NAME, USER_PASSWORD } from '@_config/env.config';
import {
  UserLoginModel,
  UserNameModel,
} from '@_playwright-main/models/user.model';

export const UserLoginModelData: UserLoginModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};
export const UserData: UserNameModel = {
  userName: USER_NAME,
};
