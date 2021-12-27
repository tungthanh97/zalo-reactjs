import { AuthResponse, UserFormSignUp } from 'Types';
import { USER_URL } from './url';
import { API } from './api';

export const signUp = async (
  signUpData: UserFormSignUp,
): Promise<AuthResponse> => {
  const { data } = await API.post<AuthResponse>(`${USER_URL}/`, signUpData);
  return data;
};
