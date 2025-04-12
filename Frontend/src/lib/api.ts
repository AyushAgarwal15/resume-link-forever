import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interface for user data
export interface User {
  id: string;
  email: string;
  name?: string;
  resumeSlug?: string;
}

// Interface for login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Interface for registration request
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// Interface for auth response
export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// Authentication API
export const authApi = {
  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  // Register user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; user: User }>(
      "/users/me"
    );
    return response.data.user;
  },

  // Logout (client-side only)
  logout: (): void => {
    localStorage.removeItem("token");
  },
};

export const resumeApi = {
  // Get all resumes
  updateResumeSlug: async (data: {
    resumeSlug: string;
    userId: string;
  }): Promise<void> => {
    const response = await api.post<void>("/resumes/update-slug", data);
    return response.data;
  },
  getResume: async (data: { resumeSlug: string }): Promise<void> => {
    const response = await api.get<void>(`/resumes/${data.resumeSlug}`);
    return response.data;
  },
};

export default api;
