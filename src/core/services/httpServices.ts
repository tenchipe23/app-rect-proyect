import axios from 'axios';
import { 
  User, 
  Product, 
  LoginCredentials, 
  RegisterData, 
  LoginResponse, 
  Order, 
  ShippingAddress 
} from '../../shared/types/interfaces';
import { BACKEND_API_URL } from '../../../GlobalEnv';

const API_URL = BACKEND_API_URL;

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const httpService = {
  login: (credentials: LoginCredentials) => 
    httpClient.post<LoginResponse>('/users/login', credentials),
  
  register: (userData: RegisterData) => 
    httpClient.post<LoginResponse>('/users/register', userData),
  
  getUserProfile: () => 
    httpClient.get<User>('/users/profile'),
  
  updateUserProfile: (userData: Partial<User>) => 
    httpClient.put<User>('/users/profile', userData),
  
  getProducts: () => 
    httpClient.get<Product[]>('/products'),
  
  getProductById: (id: number | string) => 
    httpClient.get<Product>(`/products/${id}`),
  
  getProductByCategory: (category: string) => 
    httpClient.get<Product[]>(`/products/category/${category}`),
  
  getCategories: () => 
    httpClient.get<string[]>('/categories'),
  
  createOrder: (orderData: Order) => 
    httpClient.post<Order>('/orders', orderData),
  
  getUserOrders: () => 
    httpClient.get<Order[]>('/orders/my-orders'),
  
  addShippingAddress: (address: ShippingAddress) => 
    httpClient.post<ShippingAddress>('/users/addresses', address),
  
  getShippingAddresses: () => 
    httpClient.get<ShippingAddress[]>('/users/addresses'),
};