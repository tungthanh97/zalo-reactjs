import { User, UserFormLogin } from 'Types';
import { AUTH_URL } from './url';
import { API } from './api';

export const logIn = async (loginData: UserFormLogin): Promise<User> => {
  await API.post<UserFormLogin>(`${AUTH_URL}/login`, loginData);
  const { data } = await API.get<User>(`${AUTH_URL}/login`);
  return await data;
};
