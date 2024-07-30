import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const BASE_URL = 'https://example.com';
export const BASE_URL_CHOI = 'http://13.125.199.167:8080';
export const BASE_URL_KO = 'http://3.36.54.48:8080';

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const fetchInstance = initInstance({
  baseURL: BASE_URL_KO,
});

export let axiosInstance: AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL_KO,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setBaseURL = (newBaseURL: string): void => {
  axiosInstance = axios.create({
    baseURL: newBaseURL,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
