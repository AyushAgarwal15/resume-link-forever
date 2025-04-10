
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Copy, Download, Eye, Clock, RefreshCw, FileText, User, LogOut } from "lucide-react";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("My Professional Resume.pdf");
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Resume updated!",
        description: "Your new resume is now available at your link.",
      });
      setFile(null);
    }, 2000);
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText("https://resumelink.io/john-doe");
    toast({
      title: "Link copied!",
      description: "Resume link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-blue text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold">ResumeLink</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-white text-brand-blue rounded-full p-1">
                  <User className="h-5 w-5" />
                </div>
                <span>John Doe</span>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <Tabs defaultValue="resume" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="resume">Resume Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resume" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Resume Link</CardTitle>
                  <CardDescription>
                    Share this permanent link with recruiters and contacts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      value="https://resumelink.io/john-doe"
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button onClick={copyLink} size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>This link will always point to your latest resume version.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>27 views</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4" />
                    <span>Last viewed 2 hours ago</span>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Resume</CardTitle>
                  <CardDescription>
                    View or update your current resume file
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex items-start gap-3">
                    <div className="bg-brand-light p-2 rounded">
                      <FileText className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{resumeName}</h3>
                      <p className="text-sm text-gray-500">Uploaded 5 days ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Resume
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload New Resume</CardTitle>
                <CardDescription>
                  Replace your current resume with a new version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="resume-file">Resume File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                      <input
                        id="resume-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.doc"
                      />
                      <label htmlFor="resume-file" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        {file ? (
                          <span className="text-brand-blue font-medium">{file.name}</span>
                        ) : (
                          <span className="text-gray-500">
                            Drag and drop your resume or click to browse
                          </span>
                        )}
                        <span className="text-xs text-gray-400">Supports PDF, DOCX, DOC (Max 10MB)</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resume-name">Resume Name (Optional)</Label>
                    <Input 
                      id="resume-name" 
                      value={resumeName}
                      onChange={(e) => setResumeName(e.target.value)}
                      placeholder="My Professional Resume"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={!file || isUploading}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  >
                    {isUploading ? "Uploading..." : "Upload Resume"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Resume Analytics</CardTitle>
                <CardDescription>
                  Track how many times your resume has been viewed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Total Views</p>
                      <p className="text-3xl font-bold text-brand-blue">27</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Views This Week</p>
                      <p className="text-3xl font-bold text-brand-blue">12</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Unique Visitors</p>
                      <p className="text-3xl font-bold text-brand-blue">18</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">Analytics chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and resume link settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="custom-url">Custom URL Slug</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        resumelink.io/
                      </span>
                      <Input 
                        id="custom-url" 
                        className="rounded-l-none"
                        defaultValue="john-doe"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Customize the URL slug for your resume link
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="notify-views"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                        />
                        <label htmlFor="notify-views" className="text-sm text-gray-700">
                          Notify me when someone views my resume
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="notify-update"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                        />
                        <label htmlFor="notify-update" className="text-sm text-gray-700">
                          Send me a confirmation when my resume is updated
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <div className="space-y-2">
                      <Input id="current-password" type="password" placeholder="Current password" />
                      <Input id="new-password" type="password" placeholder="New password" />
                      <Input id="confirm-new-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
