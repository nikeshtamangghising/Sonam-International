'use client';

import { useState, useEffect } from 'react';
import { apiClient, API_ENDPOINTS } from '@/lib/api';
import { User } from '@/types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
};

type UseAuthReturn = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, we would call the API to check authentication status
        // const user = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
        
        // For now, check localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: err instanceof Error ? err : new Error('Authentication check failed'),
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // In a real app, we would call the API
      // const user = await apiClient.post<User>(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // For now, simulate a successful login with mock data
      const mockUser: User = {
        id: 'user-123',
        email: credentials.email,
        first_name: 'John',
        last_name: 'Doe',
        status: 'active',
        role: 'customer',
        addresses: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Login failed'),
      });
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // In a real app, we would call the API
      // const user = await apiClient.post<User>(API_ENDPOINTS.AUTH.REGISTER, data);
      
      // For now, simulate a successful registration with mock data
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        status: 'active',
        role: 'customer',
        addresses: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Registration failed'),
      });
    }
  };

  const logout = async () => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // In a real app, we would call the API
      // await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Remove user from localStorage
      localStorage.removeItem('user');
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Logout failed'),
      });
    }
  };

  const clearError = () => {
    setState({ ...state, error: null });
  };

  return {
    ...state,
    login,
    register,
    logout,
    clearError,
  };
};

export default useAuth;
