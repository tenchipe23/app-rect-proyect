import axios from 'axios';
import { BACKEND_API_URL } from '../../../GlobalEnv';
import { 
  RegisterData, 
  User, 
  AuthResult,
  LoginResponse
} from '../../shared/types/interfaces';

const api = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(request => {
  console.log('API Request:', {
    url: request.url,
    method: request.method,
    data: request.data ? JSON.parse(JSON.stringify(request.data)) : null,
    headers: request.headers
  });
  return request;
}, error => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  console.log('API Response:', {
    status: response.status,
    data: response.data
  });
  return response;
}, error => {
  console.error('API Response Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });
  return Promise.reject(error);
});

/*
const validateToken = (token: string): boolean => {
  if (!token) return false;

  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return false;

    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};
*/

export const checkPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak';
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[]{}';':"|,.<>?]/.test(password);

  const strengthCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
    .filter(Boolean).length;

  if (strengthCount >= 3) return 'strong';
  if (strengthCount >= 2) return 'medium';
  return 'weak';
};

export const authService = {
  async login({ email, password }: { email: string; password: string }): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/users/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        return { 
          success: true,
          token: response.data.token,
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        };
      }
      
      return { 
        success: false, 
        error: 'Login failed' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Network error or server unavailable' 
      };
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload._id,
        email: payload.email,
        role: payload.role || 'user'
      };
    } catch (error) {
      console.error('Error parsing user from token:', error);
      return null;
    }
  },

  hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user && user.role ? user.role.toLowerCase() === requiredRole.toLowerCase() : false;
  },

  register: async (data: RegisterData): Promise<AuthResult> => {
    if (data.password !== data.confirmPassword) {
      return { 
        success: false, 
        error: 'Passwords do not match' 
      };
    }

    const passwordStrength = checkPasswordStrength(data.password);
    if (passwordStrength === 'weak') {
      return { 
        success: false, 
        error: 'Password is too weak' 
      };
    }

    try {
      const response = await api.post<LoginResponse>('/api/users/register', data);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        return { 
          success: true, 
          user: {
            id: response.data._id || '',
            name: response.data.name || '',
            email: response.data.email || '',
            role: response.data.role || 'user'
          }
        };
      }
      return { 
        success: false, 
        error: 'Registration failed: No token received' 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }
};
