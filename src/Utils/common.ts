import { AuthResponse } from 'Types';

export const saveToken = ({ refreshToken, accessToken }: AuthResponse) => {
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
  }
};
