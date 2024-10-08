import { AuthResponse } from '@types';
import axios from 'axios';

import { isInterceptorError, isUnhandledAuthError } from './api.helper';
import TokenService from './services/token.service';

const API_URL = process.env.API_URL;
export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use(config => {
  const { headers } = config;
  const accessToken = TokenService.getToken();
  if (headers && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  res => res,
  async err => {
    if (isInterceptorError(err) && isUnhandledAuthError(err)) {
      if (!TokenService.getToken()) throw err;
      err.config.retried = true;
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
      TokenService.setToken(response.data);
      return $api.request(err.config);
    }
    throw err;
  },
);
