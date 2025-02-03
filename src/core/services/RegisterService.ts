import axios from 'axios';
import { RegisterFormData, RegisterResponse } from '../../shared/types/RegisterTypes';
import { BACKEND_API_URL } from '../../../GlobalEnv';

export const registerUser = async (formData: RegisterFormData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${BACKEND_API_URL}/api/users/register`, formData);
        
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            return { success: true, token: response.data.token };
        } else {
            return { success: false, message: 'Registration failed' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'An error occurred during registration' };
    }
};