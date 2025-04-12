
import { useEffect, useRef } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) return; // Disable on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const elements = container.querySelectorAll('.parallax-element');
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Normalized position (-0.5 to 0.5)
      const normalizedX = (clientX / windowWidth) - 0.5;
      const normalizedY = (clientY / windowHeight) - 0.5;
      
      elements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0');
        const moveX = normalizedX * speed * -1; // Invert for natural parallax
        const moveY = normalizedY * speed * -1;
        
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="parallax-element absolute inset-0 bg-grid-pattern opacity-5" data-speed="10"></div>
      
      {/* Gradient orbs */}
      <div 
        className="parallax-element absolute -top-20 -left-20 w-96 h-96 bg-brand-teal/10 rounded-full filter blur-[100px]" 
        data-speed="30"
      ></div>
      <div 
        className="parallax-element absolute -bottom-20 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full filter blur-[100px]" 
        data-speed="20"
      ></div>
      <div 
        className="parallax-element absolute top-1/3 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-[80px]" 
        data-speed="40"
      ></div>
    </div>
  );
};

export default ParallaxBackground;
