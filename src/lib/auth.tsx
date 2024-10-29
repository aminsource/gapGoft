import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';

import { api } from './api-client';
import { configureAuth } from './react-query-auth';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
};

const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('authToken');
    return await Promise.resolve();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const loginInputSchema = z.object({
  username: z.string().min(1, 'الزامی ').email('Invalid email'),
  password: z.string().min(5, 'الزامی '),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithUsernameAndPassword = (
  data: LoginInput,
): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z.object({
  username: z.string().min(1, 'الزامی '),
  firstName: z.string().min(1, 'الزامی '),
  lastName: z.string().min(1, 'الزامی '),
  password: z.string().min(1, 'الزامی '),
  role: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithUsernameAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithUsernameAndPassword(data);
    return response;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithUsernameAndPassword(data);
    return response;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
