import { User } from './user';

export type UserFormLogin = {
  phone: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
