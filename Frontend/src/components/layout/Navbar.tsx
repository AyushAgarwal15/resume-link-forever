import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../auth/UserMenu";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-800 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-primary">
            Resume Link
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/how-it-works" className="text-gray-300 hover:text-white">
              How It Works
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="hidden md:inline-flex"
              >
                Dashboard
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/resume-builder")}
                className="hidden md:inline-flex"
              >
                Create Resume
              </Button>
              <UserMenu />
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="default" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
