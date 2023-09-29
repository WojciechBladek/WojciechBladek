import { UserLoginModel, UserNameModel } from '../models/user.model';

export const UserLoginModelData: UserLoginModel = {
  userEmail: envVariableCY('userEmail'),
  userPassword: envVariableCY('userPassword'),
};
export const UserData: UserNameModel = {
  userName: envVariableCY('userName'),
};

function envVariableCY(envVariable: string): string {
  const envVariableValue = Cypress.env(envVariable);
  return envVariableValue;
}
