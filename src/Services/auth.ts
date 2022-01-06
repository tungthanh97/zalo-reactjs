import { User, UserFormLogin, UserFormRegister, AuthResponse } from 'Types';
import { AUTH_URL } from './url';
import { API } from './api';
import jwt_decode from 'jwt-decode';
import { saveToken } from 'Utils';

const updateAuthData = (data: AuthResponse) => {
  const { accessToken, refreshToken, user } = data;
  saveToken(refreshToken, accessToken);
  console.log('user:', user);
  return user;
};

export const logIn = async (loginData: UserFormLogin): Promise<User> => {
  const { data } = await API.post<AuthResponse>(`${AUTH_URL}/login`, loginData);

  return updateAuthData(data);
};

export const userRegister = async (
  RegisterData: UserFormRegister,
): Promise<User> => {
  const { data } = await API.post<AuthResponse>(
    `${AUTH_URL}/register`,
    RegisterData,
  );

  return updateAuthData(data);
};

export const autoLogin = async (refreshToken: string): Promise<User> => {
  const { _id }: { _id: string } = jwt_decode(refreshToken);
  console.log('decoded id', _id);
  const { data } = await API.post<AuthResponse>(`${AUTH_URL}/auto-login`, {
    refreshToken,
    _id,
  });

  return updateAuthData(data);
};
