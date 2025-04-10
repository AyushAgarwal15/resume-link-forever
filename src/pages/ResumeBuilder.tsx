
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useResumeStore } from "@/store/resume-store";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ATSScoreCard from "@/components/resume/ATSScoreCard";
import EnhancementTips from "@/components/resume/EnhancementTips";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download, Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeBuilder = () => {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumeData = useResumeStore((state) => state);

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const generatePDF = async () => {
    if (!resumePreviewRef.current) return;

    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your resume...",
    });

    try {
      // Reset scale temporarily for capture
      const originalScale = scale;
      setScale(1);
      
      // Wait for state update and re-render
      setTimeout(async () => {
        const canvas = await html2canvas(resumePreviewRef.current!, {
          scale: 2,
          useCORS: true,
          logging: false,
        });
        
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("resume.pdf");
        
        // Restore original scale
        setScale(originalScale);
        
        toast({
          title: "Success!",
          description: "Your resume has been downloaded successfully.",
        });
      }, 100);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
      setScale(scale); // Restore scale in case of error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark text-white pb-16">
      <div className="container mx-auto pt-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            ATS-Friendly Resume Builder
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Create a professional, ATS-optimized resume that helps you stand out from the competition
            and increase your chances of landing interviews.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-3d p-5 h-full">
              <ResumeForm />
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className={`w-full lg:w-1/2 ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90 p-8' : ''}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-3d p-5 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Resume Preview</h2>
                
                <div className="flex items-center gap-2">
                  <Link to="/resume-full-preview">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Full Preview
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFullscreen}
                    className="text-gray-300 hover:text-white"
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                  className="text-gray-300"
                >
                  <ZoomOut size={16} />
                </Button>
                
                <div className="w-48">
                  <Slider
                    value={[scale]}
                    min={0.5}
                    max={1.5}
                    step={0.01}
                    onValueChange={handleScaleChange}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setScale(Math.min(1.5, scale + 0.1))}
                  className="text-gray-300"
                >
                  <ZoomIn size={16} />
                </Button>
                
                <span className="text-sm text-gray-300">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              <div className="relative overflow-hidden bg-gray-100 rounded-lg p-1">
                <Draggable 
                  bounds="parent"
                  disabled={!isFullscreen}
                >
                  <div
                    className="origin-top-left bg-white"
                    style={{ 
                      transform: `scale(${scale})`,
                      width: '100%',
                      backgroundColor: 'white',
                      cursor: isFullscreen ? 'grab' : 'default',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s ease-in-out'
                    }}
                  >
                    <div 
                      ref={resumePreviewRef} 
                      className="bg-white text-black min-h-[1056px] w-full"
                    >
                      <ResumePreview />
                    </div>
                  </div>
                </Draggable>
              </div>

              <div className="mt-4 flex justify-between">
                <ATSScoreCard />
                
                <Button 
                  onClick={generatePDF} 
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="mt-4">
                <EnhancementTips />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
