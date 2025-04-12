import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileEdit,
  Link as LinkIcon,
  RefreshCw,
  BarChart4,
  Sparkles,
  CheckCircle2,
  Repeat2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeIllustration from "@/components/3d/ResumeIllustration";
import FloatingElements from "@/components/3d/FloatingElements";
import ParallaxBackground from "@/components/3d/ParallaxBackground";
import { useEffect, useRef } from "react";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Animation on scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => {
      el.classList.add("opacity-0");
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        animateElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

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
                  <span className="text-gradient">One permanent link</span> for
                  your ever-changing resume
                </h1>
                <p className="text-lg text-gray-300 md:text-xl">
                  Update your resume anytime. The link stays the same. Always
                  share your most recent version without resending to everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-brand-teal to-brand-purple hover:from-brand-purple hover:to-brand-teal transition-all duration-500 shadow-glow group w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started{" "}
                        <Sparkles className="h-4 w-4 group-hover:animate-spin-slow" />
                      </span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                    >
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center animate-on-scroll">
                <ResumeIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-mesh"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold inline-block text-gradient">
                Why use ResumeLink?
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Our platform solves the common problem of having to resend
                updated resumes to everyone in your network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
                <div className="bg-gradient-to-br from-brand-blue to-brand-teal p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <LinkIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Permanent Link
                </h3>
                <p className="text-gray-300">
                  Get a unique, permanent link for your resume that never
                  changes, regardless of how many times you update your
                  document.
                </p>
              </div>

              <div className="group glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
                <div className="bg-gradient-to-br from-brand-teal to-brand-purple p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <RefreshCw className="h-6 w-6 text-white group-hover:animate-spin-slow" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Instant Updates
                </h3>
                <p className="text-gray-300">
                  Upload a new version of your resume anytime, and the changes
                  will be instantly reflected when someone visits your link.
                </p>
              </div>

              <div className="group glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
                <div className="bg-gradient-to-br from-brand-purple to-brand-accent p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                  <BarChart4 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Access Analytics
                </h3>
                <p className="text-gray-300">
                  Track how many times your resume has been viewed, when, and
                  from where, giving you valuable insights into your job search.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-bold inline-block text-gradient">
                How It Works
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Getting started with ResumeLink is simple and quick.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal via-brand-purple to-brand-accent"></div>

                <div className="space-y-12">
                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 animate-on-scroll">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-teal to-brand-blue text-white flex items-center justify-center font-bold text-xl z-10 shadow-3d">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="md:w-1/2 md:ml-auto glass-card p-6 rounded-xl animate-float">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Create an account
                      </h3>
                      <p className="text-gray-300">
                        Sign up for ResumeLink and create your personal profile
                        in just a few seconds.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 animate-on-scroll">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white flex items-center justify-center font-bold text-xl z-10 shadow-3d order-1 md:order-2">
                      <FileEdit className="h-8 w-8" />
                    </div>
                    <div className="md:w-1/2 md:mr-auto glass-card p-6 rounded-xl animate-float order-2 md:order-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Upload your resume
                      </h3>
                      <p className="text-gray-300">
                        Upload your current resume in PDF, DOCX or other formats
                        with our easy drag-and-drop interface.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 animate-on-scroll">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-purple to-brand-accent text-white flex items-center justify-center font-bold text-xl z-10 shadow-3d">
                      <Repeat2 className="h-8 w-8" />
                    </div>
                    <div className="md:w-1/2 md:ml-auto glass-card p-6 rounded-xl animate-float">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Share your link
                      </h3>
                      <p className="text-gray-300">
                        Copy and share your permanent resume link with
                        recruiters and contacts. Update anytime without changing
                        the link!
                      </p>
                    </div>
                  </div>
                </div>
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
                <h2 className="text-3xl font-bold mb-4 text-gradient">
                  Ready to simplify your job search?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Join thousands of job seekers who never worry about sending
                  outdated resumes again.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-teal to-brand-purple hover:from-brand-purple hover:to-brand-teal transition-all duration-500 shadow-lg group w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started{" "}
                        <Sparkles className="h-4 w-4 group-hover:animate-spin-slow" />
                      </span>
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                    >
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

export default Index;
