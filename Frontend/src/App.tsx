import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ResumeView from "./pages/ResumeView";
import HowItWorks from "./pages/HowItWorks";
import Index from "./pages/Index";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeFullPreview from "./pages/ResumeFullPreview";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Apply dark theme and meta viewport for responsive design
  useEffect(() => {
    // Apply dark theme
    document.documentElement.classList.add("dark");

    // Ensure proper viewport meta tag is set for responsive design
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }

    // Clean up any loading states or classes
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark text-white">
          <Routes>
            {/* Public routes - accessible to everyone */}
            <Route path="/" element={<Index />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/r/:username" element={<ResumeView />} />

            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route
                path="/resume-full-preview"
                element={<ResumeFullPreview />}
              />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            <Route path="/r/:resumeSlug" element={<ResumeView />} />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// PublicRoute component - redirects to dashboard if already authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Wait for auth to initialize
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    // Check if we have a redirect URL from location state
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  // Render children if not authenticated
  return <>{children}</>;
};

export default App;
