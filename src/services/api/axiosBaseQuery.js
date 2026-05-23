import { axiosInstance } from './axiosInstance';

export const axiosBaseQuery =
  () =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.status ?? 'CUSTOM_ERROR',
          data: error.data ?? error.message,
          message: error.message,
        },
      };
    }
  };
