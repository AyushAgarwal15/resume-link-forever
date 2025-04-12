
import { FileText, Heart, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 bg-gradient-to-b from-transparent to-gray-900 backdrop-blur-sm">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FileText className="h-6 w-6 text-brand-teal" />
                <div className="absolute -inset-1 bg-brand-teal/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold text-gradient">ResumeLink</span>
            </div>
            <p className="text-sm text-gray-400 mt-2 text-center md:text-left max-w-xs">
              Always share your latest resume with one permanent link that updates in real-time
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="text-sm font-medium mb-3 text-center md:text-left text-white">Product</h3>
              <ul className="text-sm text-gray-400 space-y-3 text-center md:text-left">
                <li><Link to="/features" className="hover:text-brand-teal transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-brand-teal transition-colors">Pricing</Link></li>
                <li><Link to="/testimonials" className="hover:text-brand-teal transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3 text-center md:text-left text-white">Support</h3>
              <ul className="text-sm text-gray-400 space-y-3 text-center md:text-left">
                <li><Link to="/faq" className="hover:text-brand-teal transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-brand-teal transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-brand-teal transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3 text-center md:text-left text-white">Legal</h3>
              <ul className="text-sm text-gray-400 space-y-3 text-center md:text-left">
                <li><Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-brand-teal transition-colors">Terms</Link></li>
                <li><Link to="/cookies" className="hover:text-brand-teal transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ResumeLink. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-brand-teal" /> for job seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
