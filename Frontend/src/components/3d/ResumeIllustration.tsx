
import { useEffect, useRef } from 'react';
import { FileText, Link as LinkIcon, RefreshCw } from 'lucide-react';

const ResumeIllustration = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let rotateX = 0;
    let rotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center as a percentage (-1 to 1)
      targetRotateX = -((e.clientY - centerY) / (rect.height / 2)) * 10;
      targetRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    };
    
    const animate = () => {
      // Smooth transition to target rotation
      rotateX += (targetRotateX - rotateX) * 0.05;
      rotateY += (targetRotateY - rotateY) * 0.05;
      
      if (container) {
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000" ref={containerRef}>
      {/* 3D Resume Stack */}
      <div className="absolute inset-x-0 -bottom-10 h-4 bg-gradient-to-r from-brand-purple/20 to-brand-teal/20 blur-xl rounded-full"></div>
      
      <div className="relative transform transition-all duration-300 preserves-3d">
        {/* Background Sheet */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-teal/20 rounded-xl blur-md -rotate-6 scale-105 -translate-x-4 translate-y-4"></div>
        
        {/* Middle Sheet */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/30 to-brand-purple/30 rounded-xl blur-sm rotate-3 scale-103 -translate-x-2 translate-y-2"></div>
        
        {/* Front Sheet */}
        <div className="relative bg-gray-800/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-3d">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-teal">
              <LinkIcon className="h-5 w-5 animate-pulse-slow" />
              <span className="text-lg font-medium">resumelink.io/jane-smith</span>
            </div>
            <div className="border-t border-dashed border-gray-600 my-2"></div>
            <div className="flex items-start gap-3">
              <div className="bg-brand-blue/30 p-3 rounded backdrop-blur-sm border border-brand-teal/20 animate-float">
                <FileText className="h-8 w-8 text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Resume_JaneSmith_2025.pdf</h3>
                <p className="text-sm text-gray-400">Updated 3 days ago</p>
              </div>
            </div>
            <div className="bg-gray-700 hover:bg-gray-600 text-white border border-white/10 rounded p-2 text-center group flex items-center justify-center gap-2 cursor-pointer">
              Update Resume
              <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeIllustration;
