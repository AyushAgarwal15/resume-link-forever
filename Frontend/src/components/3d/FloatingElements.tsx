
import { useEffect, useRef } from 'react';
import { FileText, Link as LinkIcon, BarChart4, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const elements = container.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
      const speed = 1 + Math.random() * 2;
      const direction = index % 2 === 0 ? 1 : -1;
      const delay = Math.random() * 2;
      const amplitude = 5 + Math.random() * 15;
      const htmlElement = element as HTMLElement;
      
      let startY = parseFloat(getComputedStyle(htmlElement).top);
      if (isNaN(startY)) startY = 0;
      
      const animate = (time: number) => {
        const position = Math.sin((time / 1000 * speed) + delay) * amplitude * direction;
        htmlElement.style.transform = `translateY(${position}px) rotate(${position/2}deg)`;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    });
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="floating-element absolute top-[10%] left-[15%] bg-brand-teal/20 p-3 rounded-full backdrop-blur-sm border border-brand-teal/30">
        <FileText className="h-6 w-6 text-brand-teal" />
      </div>
      
      <div className="floating-element absolute top-[25%] right-[10%] bg-brand-purple/20 p-3 rounded-full backdrop-blur-sm border border-brand-purple/30">
        <LinkIcon className="h-6 w-6 text-brand-purple" />
      </div>
      
      <div className="floating-element absolute bottom-[15%] left-[20%] bg-brand-accent/20 p-3 rounded-full backdrop-blur-sm border border-brand-accent/30">
        <BarChart4 className="h-6 w-6 text-brand-accent" />
      </div>
      
      <div className="floating-element absolute bottom-[25%] right-[15%] bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default FloatingElements;
