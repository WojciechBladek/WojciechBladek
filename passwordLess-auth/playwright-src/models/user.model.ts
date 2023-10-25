export interface AdminLoginModel {
  email: string;
  password: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface EnvTokenModel {
  basicToken: string;
}

export interface LoginViaImap {
  email: string;
  path: string;
}
