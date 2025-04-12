
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileEdit, Link2, RefreshCw, Clock, CheckCircle2, User, Users, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingElements from "@/components/3d/FloatingElements";
import ParallaxBackground from "@/components/3d/ParallaxBackground";
import { useEffect, useRef } from "react";
import HowItWorksIllustration from "@/components/3d/HowItWorksIllustration";
import StepCard from "@/components/cards/StepCard";

const HowItWorks = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Animation on scroll
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
      el.classList.add('opacity-0');
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        animateElements.forEach(el => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Create your account",
      description: "Sign up in seconds with your email or social media account",
      icon: User,
      color: "from-brand-teal to-brand-blue"
    },
    {
      id: 2,
      title: "Upload your resume",
      description: "Upload your PDF, DOCX, or other resume formats with drag & drop",
      icon: FileEdit,
      color: "from-brand-blue to-brand-purple"
    },
    {
      id: 3,
      title: "Share your permanent link",
      description: "Get a unique, permanent link that never changes",
      icon: Link2,
      color: "from-brand-purple to-brand-accent"
    },
    {
      id: 4,
      title: "Update anytime",
      description: "Update your resume whenever needed without changing the link",
      icon: RefreshCw,
      color: "from-brand-accent to-brand-teal"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-brand-dark text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 relative">
          <ParallaxBackground />
          <FloatingElements />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6 animate-on-scroll">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-gradient">How ResumeLink Works</span>
                </h1>
                <p className="text-lg text-gray-300 md:text-xl">
                  We've simplified the resume sharing process so you can focus on your job search, not on resending updated documents.
                </p>
              </div>
              <div className="lg:w-1/2 flex justify-center animate-on-scroll">
                <div className="perspective-1000 w-full max-w-md">
                  <HowItWorksIllustration />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold inline-block text-gradient">Simple 4-Step Process</h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                ResumeLink makes maintaining your professional presence effortless
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Explanation */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-blue/10"></div>
          <div className="absolute top-40 right-0 w-72 h-72 bg-brand-purple/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-brand-teal/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                <div className="glass-card p-8 rounded-2xl animate-on-scroll">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-brand-teal to-brand-blue p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-glow animate-float">
                          <User className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-brand-teal/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4 text-white">Sign Up in Seconds</h3>
                      <p className="text-gray-300">
                        Create your ResumeLink account using your email or connect with your Google, LinkedIn, or other social accounts. Our streamlined registration process takes less than a minute, getting you to your personalized dashboard quickly.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Free accounts available</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">No credit card required</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Secure authentication</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl animate-on-scroll">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 flex justify-center md:order-last">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-brand-blue to-brand-purple p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-glow animate-float">
                          <FileEdit className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-brand-purple/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:order-first">
                      <h3 className="text-2xl font-bold mb-4 text-white">Upload Your Resume</h3>
                      <p className="text-gray-300">
                        Our intuitive drag-and-drop interface makes uploading your resume effortless. We support all common file formats including PDF, DOCX, RTF, and more. Your documents are stored securely and encrypted for maximum privacy.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Multiple formats</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Drag & drop</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">End-to-end encryption</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl animate-on-scroll">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-brand-purple to-brand-accent p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-glow animate-float">
                          <Link2 className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-brand-accent/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4 text-white">Share Your Permanent Link</h3>
                      <p className="text-gray-300">
                        Once uploaded, you'll receive a unique, permanent link to your resume that you can share with recruiters, on job applications, and in your professional profiles. Premium users can customize their links for better personal branding.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Immutable links</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">One-click copying</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Custom URLs (Premium)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl animate-on-scroll">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 flex justify-center md:order-last">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-brand-accent to-brand-teal p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-glow animate-float">
                          <RefreshCw className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-brand-teal/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:order-first">
                      <h3 className="text-2xl font-bold mb-4 text-white">Update Anytime</h3>
                      <p className="text-gray-300">
                        As your career progresses, simply upload new versions of your resume whenever needed. Your link stays the same, but anyone who visits it will always see your most current version. No more sending follow-up emails with updated resumes!
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Instant updates</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Version history (Premium)</span>
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">Undo changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold inline-block text-gradient">Why Job Seekers Love ResumeLink</h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Our platform provides unique advantages that streamline your job search process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-teal to-brand-blue p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Save Time</h3>
                <p className="text-gray-300">
                  No more searching for the latest version or resending updated resumes. Your permanent link always displays your most current resume.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-purple to-brand-accent p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Track Performance</h3>
                <p className="text-gray-300">
                  Get valuable insights with our analytics feature. Know when and how often your resume is viewed to optimize your job search.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-accent to-brand-teal p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Secure & Private</h3>
                <p className="text-gray-300">
                  Your data is encrypted and protected. You control who sees your resume with optional privacy settings.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-blue to-brand-purple p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Professional Impression</h3>
                <p className="text-gray-300">
                  Make a strong first impression with recruiters by using a modern, professional solution for sharing your credentials.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-teal to-brand-blue p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Always Up-To-Date</h3>
                <p className="text-gray-300">
                  Ensure recruiters always see your latest skills, experiences, and achievements without sending multiple emails.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll group">
                <div className="bg-gradient-to-br from-brand-purple to-brand-accent p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Premium Features</h3>
                <p className="text-gray-300">
                  Access advanced features like custom URLs, version history, and enhanced analytics with our premium plans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-accent/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-br from-brand-blue/80 to-brand-dark/90 text-white rounded-2xl p-8 md:p-12 backdrop-blur-lg border border-white/10 shadow-3d relative overflow-hidden animate-on-scroll">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/30 rounded-full filter blur-[60px]"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-teal/30 rounded-full filter blur-[60px]"></div>
              
              <div className="max-w-3xl mx-auto text-center relative">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to simplify your job search?</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Join thousands of job seekers who never worry about sending outdated resumes again.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-gradient-to-r from-brand-teal to-brand-purple hover:from-brand-purple hover:to-brand-teal transition-all duration-500 shadow-lg group w-full sm:w-auto">
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started <Sparkles className="h-4 w-4 group-hover:animate-spin-slow" />
                      </span>
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
