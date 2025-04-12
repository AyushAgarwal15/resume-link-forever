
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeView from "./pages/ResumeView";
import HowItWorks from "./pages/HowItWorks";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeFullPreview from "./pages/ResumeFullPreview";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Apply dark theme and meta viewport for responsive design
  useEffect(() => {
    // Apply dark theme
    document.documentElement.classList.add('dark');
    
    // Ensure proper viewport meta tag is set for responsive design
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Clean up any loading states or classes
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark text-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/r/:username" element={<ResumeView />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/resume-full-preview" element={<ResumeFullPreview />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
