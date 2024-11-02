// Axios configuration with interceptors
import Axios from 'axios';

// import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
// import { getAuthToken } from '@/utils/storage';

export const api = Axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // config.headers.Authorization = getAuthToken();
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    // Uncomment below if redirection is required on unauthorized status
    // if (error.response?.status === 401) {
    //   window.location.href = `/auth/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
    // }

    return Promise.reject(error);
  },
);
