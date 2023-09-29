import { UserLoginModel, UserNameModel } from '../models/user.model';

export const UserLoginModelData: UserLoginModel = {
  userEmail: Cypress.env('userEmail') ?? '[NOT SET]',
  userPassword: Cypress.env('userPassword') ?? '[NOT SET]',
};
export const UserData: UserNameModel = {
  userName: Cypress.env('userName') ?? '[NOT SET]',
};
