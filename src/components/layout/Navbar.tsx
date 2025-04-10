
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`backdrop-blur-md border-b transition-all duration-300 sticky top-0 z-50 ${
      scrolled ? 'bg-black/30 border-white/10' : 'bg-transparent border-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FileText className={`h-6 w-6 text-brand-teal ${scrolled ? 'animate-pulse-slow' : ''}`} />
            <div className="absolute -inset-1 bg-brand-teal/20 rounded-full blur-md animate-pulse-slow"></div>
          </div>
          <Link to="/" className="text-xl font-bold text-gradient">
            ResumeLink
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/how-it-works">
            <Button variant="ghost" className="hover:bg-white/5 text-white transition-all duration-300">How It Works</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="hover:bg-white/5 text-white transition-all duration-300">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="relative overflow-hidden bg-gradient-to-r from-brand-teal to-brand-purple hover:from-brand-purple hover:to-brand-teal transition-all duration-300 group">
              <span className="relative z-10 flex items-center gap-1">
                Sign Up <Sparkles className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white h-10 w-10"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="container mx-auto pt-24 px-6 flex flex-col items-center gap-6">
            <Link to="/" onClick={closeMobileMenu}>
              <div className="text-2xl font-bold text-gradient">ResumeLink</div>
            </Link>
            
            <div className="flex flex-col items-center gap-6 w-full mt-8">
              <Link to="/how-it-works" onClick={closeMobileMenu} className="w-full">
                <Button variant="outline" className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white text-lg py-6">
                  How It Works
                </Button>
              </Link>
              
              <Link to="/login" onClick={closeMobileMenu} className="w-full">
                <Button variant="outline" className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white text-lg py-6">
                  Login
                </Button>
              </Link>
              
              <Link to="/signup" onClick={closeMobileMenu} className="w-full">
                <Button className="w-full bg-gradient-to-r from-brand-teal to-brand-purple hover:from-brand-purple hover:to-brand-teal text-lg py-6 group">
                  <span className="flex items-center justify-center gap-2">
                    Sign Up <Sparkles className="h-5 w-5 group-hover:animate-spin-slow" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
