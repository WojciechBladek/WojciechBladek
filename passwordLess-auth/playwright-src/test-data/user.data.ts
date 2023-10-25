import { ADMIN_EMAIL, ADMIN_PASSWORD, ENV_TOKEN, USER_EMAIL, USER_PASSWORD } from '@_playwright-src/env.config';
import { AdminLoginModel, EnvTokenModel, LoginViaImap, UserLoginModel } from '@_playwright-src/models/user.model';

export const adminPath = 'playwright/.auth/admin.json';
const userPath = 'playwright/.auth/user.json';
export const nonLoggedUserPath = 'playwright/.auth/unlogged.json';

// Should have role 0 in DB
export const user: UserLoginModel = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};

// Set role 2 in DB
export const admin: AdminLoginModel = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

export const EnvironmentToken: EnvTokenModel = {
  basicToken: ENV_TOKEN,
};

export const loginAdminViaImap: LoginViaImap = {
  email: admin.email,
  path: adminPath,
};

export const loginUserViaImap: LoginViaImap = {
  email: user.email,
  path: userPath,
};
