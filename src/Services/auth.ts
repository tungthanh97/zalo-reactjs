import { User, UserFormLogin, UserFormRegister, AuthResponse } from 'Types';
import { AUTH_URL } from './url';
import { API } from './api';
import jwt_decode from 'jwt-decode';
import { saveToken } from 'Utils';

function updateAuthData(data: AuthResponse) {
  const { accessToken, refreshToken, user } = data;
  saveToken(refreshToken, accessToken);
  console.log('user:', user);
  return user;
}

export const authService = {
  async logIn(loginData: UserFormLogin): Promise<User> {
    const { data } = await API.post<AuthResponse>(
      `${AUTH_URL}/login`,
      loginData,
    );

    return updateAuthData(data);
  },

  async register(RegisterData: UserFormRegister): Promise<User> {
    const { data } = await API.post<AuthResponse>(
      `${AUTH_URL}/register`,
      RegisterData,
    );

    return updateAuthData(data);
  },

  async autoLogin(refreshToken: string): Promise<User> {
    const { _id }: { _id: string } = jwt_decode(refreshToken);
    const { data } = await API.post<AuthResponse>(`${AUTH_URL}/auto-login`, {
      refreshToken,
      _id,
    });

    return updateAuthData(data);
  },

  async verifyOTP(phone: string) {
    await API.post(`${AUTH_URL}/verify-phone`, {
      phone,
    });
  },
};
