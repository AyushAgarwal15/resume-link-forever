import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import LoginForm from "../../components/auth/LoginForm";
import { ArrowRight } from "lucide-react";

const LoginPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-brand-dark flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="border border-gray-800 bg-gray-900/80 backdrop-blur-lg shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <LoginForm />

          <div className="p-6 text-center text-sm border-t border-gray-800">
            <div className="flex items-center justify-center space-x-1 text-gray-400">
              <span>Don't have an account?</span>
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80 inline-flex items-center transition-all"
              >
                Create account
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
