export const saveToken = (refreshToken: string, accessToken: string) => {
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
  }
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
