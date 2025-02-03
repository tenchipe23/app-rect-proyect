import axios, { AxiosError } from 'axios';
import { BACKEND_API_URL } from '../../../GlobalEnv';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export const loginUser = async (formData: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/users/login`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return { 
        success: true, 
        token: response.data.token,
        user: response.data,
        message: 'Login successful'
      };
    } else {
      console.error('Login failed:', response.data);
      return { 
        success: false, 
        message: response.data.message || 'Login failed: Invalid credentials' 
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error:', {
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers
      });

      if (axiosError.response) {
        return {
          success: false,
          message: axiosError.message || 'Login failed: Server error'
        };
      } else if (axiosError.request) {
        return {
          success: false,
          message: 'Login failed: No response from server'
        };
      }
    }
    
    console.error('Unexpected login error:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred during login' 
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const getCurrentUser = () => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};
