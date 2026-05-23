import axios from 'axios';
import { API_TIMEOUT } from '@/constants/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('Missing required environment variable: VITE_API_BASE_URL');
}

export const normalizeApiError = (error) => {
  const status = error.response?.status ?? error.status ?? 'NETWORK_ERROR';
  const data = error.response?.data ?? error.data ?? null;
  const message =
    data?.message ?? error.message ?? 'The request could not be completed. Please try again.';

  return {
    status,
    data,
    message,
  };
};

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => config);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
);
