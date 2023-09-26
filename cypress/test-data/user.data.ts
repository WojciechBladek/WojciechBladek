import { UserLogin, UserName } from '../models/user.model';

export const UserLoginData: UserLogin = {
  userEmail: Cypress.env('userEmail') ?? '[NOT SET]',
  userPassword: Cypress.env('userPassword') ?? '[NOT SET]',
};
export const UserData: UserName = {
  userName: Cypress.env('userName') ?? '[NOT SET]',
};
