export type UserFormLogin = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
