
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";

const ResumeView = () => {
  const { username } = useParams<{ username: string }>();
  
  // In a real app, we would fetch the resume based on the username parameter
  const mockResume = {
    user: username || "john-doe",
    resumeName: "Professional Resume",
    fileType: "pdf",
    updatedAt: "2025-04-01",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-brand-blue">
                ResumeLink
              </a>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Original
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {mockResume.resumeName}
              </h1>
              <p className="text-gray-500">
                Last updated on {mockResume.updatedAt}
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg border overflow-hidden">
            <div className="p-8 flex items-center justify-center">
              {/* This would be replaced by an actual PDF/resume viewer */}
              <div className="w-full aspect-[1/1.4] border border-dashed border-gray-300 rounded flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-xl font-medium text-gray-700 mb-2">Resume Preview</p>
                  <p className="text-gray-500 mb-4">
                    This is a placeholder for the actual resume viewer
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            Powered by <a href="/" className="text-brand-blue hover:underline">ResumeLink</a> - Always share your latest resume
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResumeView;
