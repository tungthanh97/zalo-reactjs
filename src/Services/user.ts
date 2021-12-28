import { AuthResponse, UserFormRegister } from 'Types';
import { USER_URL } from './url';
import { API } from './api';

export const userRegister = async (
  RegisterData: UserFormRegister,
): Promise<AuthResponse> => {
  const { data } = await API.post<AuthResponse>(`${USER_URL}/`, RegisterData);
  return data;
};

export const fetchUser = async (): Promise<AuthResponse> => {
  const { data } = await API.get<AuthResponse>(`${USER_URL}/`);
  return data;
};
