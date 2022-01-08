import { AuthResponse, ErrorMessage } from 'Types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, AUTH_URL } from './url';
import { saveToken, removeToken } from 'Utils';

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

const refreshToken = async () => {
  const token = localStorage.getItem('refresh_token');
  const { data } = await axios.post<AuthResponse>(`${AUTH_URL}/refresh`, {
    refresh_token: token,
  });
  const { refreshToken, accessToken } = data;
  saveToken(refreshToken, accessToken);
};

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('refresh_token');
  if (token != null) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  undefined,
  async (err: AxiosError): Promise<AxiosResponse> => {
    const requestCfg = err.config;
    if (err.response?.status === 403) {
      try {
        await refreshToken();
      } catch (error) {
        removeToken();
        return Promise.reject(error);
      }
      return axios.request(requestCfg);
    }
    const errorMessage: ErrorMessage = {
      status: err.response?.status,
      message: err.response?.data,
    };
    return Promise.reject(errorMessage);
  },
);
