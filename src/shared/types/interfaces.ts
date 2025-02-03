export interface User {
    id: string;
    name?: string;
    email: string;
    profileImage?: string;
    phoneNumber?: string;
    address?: string;
    savedAddresses?: string[];
    savedPaymentMethods?: string[];
    role?: string;
  }
  
 export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
    confirmPassword: string;
  }
  
  export interface LoginResponse {
    token?: string;
    _id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    role?: string; 
    success?: boolean;
    error?: string;
  }


  
  export interface Order {
    id: string;
    userId: string;
    products: Product[];
    total: number;
    status: string;
  }
  
  export interface ShippingAddress {
    id?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface AuthResult {
    success: boolean;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    error?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
    register: (data: RegisterData) => Promise<AuthResult>;
  }