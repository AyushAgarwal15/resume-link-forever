import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, User, LoginRequest, RegisterRequest } from "../lib/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
});

// Error type for API errors
interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Array<{ field: string; message: string }>;
    };
    status?: number;
  };
  message?: string;
}

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch (err) {
          // Token might be invalid or expired
          localStorage.removeItem("token");
          console.error("Auth initialization error:", err);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.login(data);

      // Save token to localStorage
      localStorage.setItem("token", response.token);

      // Set user data
      setUser(response.user);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.message || "Login failed. Please try again."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.register(data);

      // Save token to localStorage
      localStorage.setItem("token", response.token);

      // Set user data
      setUser(response.user);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.message ||
          "Registration failed. Please try again."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
