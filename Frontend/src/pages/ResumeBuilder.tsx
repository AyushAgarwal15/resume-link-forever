import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Draggable, { DraggableEventHandler } from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useResumeStore } from "@/store/resume-store";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ATSScoreCard from "@/components/resume/ATSScoreCard";
import EnhancementTips from "@/components/resume/EnhancementTips";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  Minimize2,
  ExternalLink,
  Move,
  RotateCcw,
  Save,
  FileCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ResumeBuilder = () => {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [scale, setScale] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const resumeData = useResumeStore((state) => state);

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Reset position when toggling fullscreen
    setPosition({ x: 0, y: 0 });
  };

  const resetZoomAndPosition = () => {
    setScale(0.85);
    setPosition({ x: 0, y: 0 });
    toast({
      title: "Reset complete",
      description: "View has been reset to default",
    });
  };

  const handleDragStop: DraggableEventHandler = (_, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  // Function to split the resume into pages for PDF generation
  const generatePDF = async () => {
    if (!resumePreviewRef.current) return;

    setIsPdfGenerating(true);
    setPdfProgress(5);

    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your resume...",
    });

    try {
      // Store original scale and position
      const originalScale = scale;
      const originalPosition = { ...position };

      // Reset scale and position for capture
      setScale(1);
      setPosition({ x: 0, y: 0 });

      // Wait for state update and re-render
      setTimeout(async () => {
        setPdfProgress(20);

        // Create a PDF with A4 dimensions
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        setPdfProgress(40);

        // Capture the resume
        const canvas = await html2canvas(resumePreviewRef.current!, {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: resumePreviewRef.current!.scrollWidth,
          windowHeight: resumePreviewRef.current!.scrollHeight,
        });

        setPdfProgress(60);

        // Get dimensions
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate number of pages needed
        const pagesNeeded = Math.ceil(imgHeight / pageHeight);

        setPdfProgress(70);

        // Add each page to the PDF
        for (let i = 0; i < pagesNeeded; i++) {
          if (i > 0) {
            pdf.addPage();
          }

          // Calculate which part of the image to use for this page
          const sourceY = i * pageHeight * (canvas.width / imgWidth);
          const canvasHeight = Math.min(
            pageHeight * (canvas.width / imgWidth),
            canvas.height - sourceY
          );

          // Add the image with specific positioning
          pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );

          setPdfProgress(70 + (i / pagesNeeded) * 20);
        }

        setPdfProgress(90);

        // Save the PDF
        pdf.save("resume.pdf");

        // Restore original scale and position
        setScale(originalScale);
        setPosition(originalPosition);

        setPdfProgress(100);
        setIsPdfGenerating(false);

        toast({
          title: "Success!",
          description: "Your resume has been downloaded successfully.",
          variant: "default",
        });
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsPdfGenerating(false);
      setPdfProgress(0);
      toast({
        title: "Error",
        description:
          "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark text-white pb-16">
      <div className="container mx-auto pt-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Smart Resume Builder
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Create a professional, ATS-optimized resume that helps you stand out
            from the competition and increase your chances of landing
            interviews.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-5 h-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-primary/80" />
                  Resume Details
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Auto-saving
                </Button>
              </div>
              <div
                className="overflow-y-auto pr-2 custom-scrollbar"
                style={{ maxHeight: "calc(100vh - 220px)" }}
              >
                <ResumeForm />
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div
            className={`w-full lg:w-1/2 ${
              isFullscreen
                ? "fixed inset-0 z-50 bg-black/95 p-8 overflow-hidden"
                : ""
            }`}
          >
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-5 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-primary/80" />
                  Resume Preview
                </h2>

                <div className="flex items-center gap-2">
                  <Link to="/resume-full-preview">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-300 hover:text-white border-gray-700 hover:border-primary/70 transition-all"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Full View
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-gray-300 hover:text-white border-gray-700 hover:border-primary/70 transition-all"
                  >
                    {isFullscreen ? (
                      <Minimize2 size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-2 mb-4 bg-gray-850/40 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScale(Math.max(0.4, scale - 0.1))}
                    className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                    disabled={isPdfGenerating}
                  >
                    <ZoomOut size={14} />
                  </Button>

                  <div className="w-24 sm:w-32 md:w-40">
                    <Slider
                      value={[scale]}
                      min={0.4}
                      max={1.8}
                      step={0.01}
                      onValueChange={handleScaleChange}
                      disabled={isPdfGenerating}
                      className="cursor-pointer"
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScale(Math.min(1.8, scale + 0.1))}
                    className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                    disabled={isPdfGenerating}
                  >
                    <ZoomIn size={14} />
                  </Button>

                  <span className="text-xs text-gray-300 w-12">
                    {Math.round(scale * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isFullscreen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetZoomAndPosition}
                      className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                      disabled={isPdfGenerating}
                    >
                      <RotateCcw size={14} className="mr-1" />
                      <span className="text-xs">Reset</span>
                    </Button>
                  )}

                  <Button
                    onClick={generatePDF}
                    disabled={isPdfGenerating}
                    className="bg-primary hover:bg-primary/90 text-white transition-all"
                    size="sm"
                  >
                    {isPdfGenerating ? (
                      <>
                        <span className="text-xs mr-2">Generating...</span>
                        <span className="text-xs">{pdfProgress}%</span>
                      </>
                    ) : (
                      <>
                        <Download size={14} className="mr-1" />
                        <span className="text-xs">PDF</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isPdfGenerating && (
                <Progress value={pdfProgress} className="h-1 mb-4" />
              )}

              <div className="relative overflow-hidden bg-gray-100 rounded-lg border border-gray-200 shadow-inner">
                {isFullscreen && (
                  <div className="absolute top-2 left-2 z-10 bg-gray-800/70 backdrop-blur-sm text-white text-xs p-1 rounded-md flex items-center">
                    <Move size={12} className="mr-1" />
                    Drag to move
                  </div>
                )}

                <Draggable
                  position={position}
                  onStop={handleDragStop}
                  bounds={isFullscreen ? undefined : "parent"}
                  disabled={!isFullscreen || isPdfGenerating}
                >
                  <div
                    className="origin-top-left bg-white"
                    style={{
                      transform: `scale(${scale})`,
                      width: "100%",
                      backgroundColor: "white",
                      cursor:
                        isFullscreen && !isPdfGenerating ? "grab" : "default",
                      boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
                      transition: isPdfGenerating
                        ? "none"
                        : "transform 0.2s ease-out, box-shadow 0.3s ease-in-out",
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

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <EnhancementTips />
                </div>

                <div>
                  <ATSScoreCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
