import { useEffect, useRef } from "react";

const HowItWorksIllustration = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple parallax effect for the illustration
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const elements = container.querySelectorAll(".parallax-element");
      elements.forEach((el, index) => {
        const depth = 1 + (index + 1) * 0.1;
        const moveX = x * 20 * depth;
        const moveY = y * 20 * depth;
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] preserve-3d">
      {/* Document Base */}
      <div className="parallax-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/10 to-white/5 w-64 h-80 rounded-lg border border-white/20 shadow-3d">
        <div className="p-4">
          <div className="bg-white/10 h-5 w-40 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-48 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-44 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-48 rounded mb-6"></div>

          <div className="bg-white/10 h-4 w-32 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-40 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-36 rounded mb-6"></div>

          <div className="bg-white/10 h-4 w-32 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-40 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-36 rounded mb-2"></div>
        </div>
      </div>

      {/* Document Top Layer with Link */}
      <div className="parallax-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 translate-z-10 bg-gradient-to-br from-white/15 to-white/5 w-64 h-80 rounded-lg border border-white/20 shadow-3d">
        <div className="p-4">
          <div className="bg-white/10 h-5 w-40 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-48 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-44 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-48 rounded mb-6"></div>

          <div className="bg-white/10 h-4 w-32 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-40 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-36 rounded mb-6"></div>

          <div className="bg-white/10 h-4 w-32 rounded mb-3"></div>
          <div className="bg-white/10 h-3 w-40 rounded mb-2"></div>
          <div className="bg-white/10 h-3 w-36 rounded mb-2"></div>
        </div>
      </div>

      {/* Link Visualization */}
      <div className="parallax-element absolute top-[30%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 translate-z-20">
        <div className="bg-gradient-to-r from-brand-teal to-brand-purple p-3 rounded-full animate-pulse-glow">
          <div className="bg-white/90 text-brand-dark font-mono text-xs p-2 rounded-md shadow-glow animate-float">
            resumelink.io/your-name
          </div>
        </div>
      </div>

      {/* Update Icon */}
      <div className="parallax-element absolute bottom-[20%] right-[20%] transform translate-z-30">
        <div className="bg-brand-accent/80 p-3 rounded-full shadow-glow animate-float animate-pulse-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="parallax-element absolute top-[15%] left-[20%] transform translate-z-15">
        <div className="bg-gradient-to-br from-brand-purple/60 to-brand-teal/60 w-10 h-10 rounded-full animate-float shadow-glow"></div>
      </div>

      <div className="parallax-element absolute bottom-[15%] left-[30%] transform translate-z-25">
        <div
          className="bg-gradient-to-br from-brand-blue/60 to-brand-purple/60 w-8 h-8 rounded-full animate-float shadow-glow"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};

export default HowItWorksIllustration;
