
import { useState, useRef } from "react";
import { useResumeStore } from "@/store/resume-store";
import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { 
  Download, Eye, EyeOff, Plus, Image, 
  Save, ArrowLeft
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ResumeFullPreview = () => {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const resumeState = useResumeStore();
  const { 
    visibleSections, 
    customSections, 
    toggleSectionVisibility, 
    addCustomSection, 
    updateCustomSection, 
    removeCustomSection,
    setProfileImage 
  } = resumeState;
  
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");
  
  const handleAddCustomSection = () => {
    if (!newSectionTitle.trim()) {
      toast({
        title: "Error",
        description: "Section title is required",
        variant: "destructive"
      });
      return;
    }
    
    addCustomSection({
      title: newSectionTitle,
      content: newSectionContent,
      visible: true,
      order: customSections.length
    });
    
    setNewSectionTitle("");
    setNewSectionContent("");
    
    toast({
      title: "Success",
      description: "Custom section added successfully"
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
        toast({
          title: "Success",
          description: "Profile image uploaded"
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const generatePDF = async () => {
    if (!resumePreviewRef.current) return;

    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your resume...",
    });

    try {
      const canvas = await html2canvas(resumePreviewRef.current, {
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
      
      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-brand-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Link to="/resume-builder">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Resume Preview</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Profile Photo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="picture">Choose a profile picture</Label>
                  <Input 
                    id="picture" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </div>
              </DialogContent>
            </Dialog>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add Custom Section</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sectionTitle">Section Title</Label>
                    <Input 
                      id="sectionTitle" 
                      value={newSectionTitle} 
                      onChange={(e) => setNewSectionTitle(e.target.value)} 
                      placeholder="e.g., Publications"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sectionContent">Content</Label>
                    <Textarea 
                      id="sectionContent" 
                      value={newSectionContent} 
                      onChange={(e) => setNewSectionContent(e.target.value)} 
                      placeholder="Add your content here..."
                      className="min-h-[200px]"
                    />
                  </div>
                  <Button onClick={handleAddCustomSection}>Add Section</Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="default" onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div ref={resumePreviewRef} className="text-black">
              <ResumePreview editable={true} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Section Visibility</h2>
              <div className="space-y-2">
                {Object.entries(visibleSections).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSectionVisibility(key as keyof typeof visibleSections)}
                    >
                      {value ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {customSections.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Custom Sections</h2>
                <div className="space-y-4">
                  {customSections.map((section) => (
                    <div key={section.id} className="border border-gray-700 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Remove</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this custom section.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => removeCustomSection(section.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <p className="text-sm text-gray-300">{section.content.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFullPreview;
