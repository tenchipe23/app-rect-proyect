export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    _id?: string;
    success: boolean;
    message?: string;
    username?: string;
    email?: string;
    token?: string;
    error?: string;
}