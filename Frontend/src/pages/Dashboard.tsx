import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Copy, Download, Eye, Clock, RefreshCw, FileText, User, LogOut, BarChart, PieChart, LineChart, Archive } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("My Professional Resume.pdf");
  const [isUploading, setIsUploading] = useState(false);
  
  const [oldResumes] = useState([
    { id: 1, name: "Software Engineer Resume", date: "2023-12-15", views: 45 },
    { id: 2, name: "Frontend Developer CV", date: "2023-10-22", views: 32 },
    { id: 3, name: "Full Stack Resume", date: "2023-08-05", views: 18 },
    { id: 4, name: "Tech Lead Resume", date: "2023-05-17", views: 27 },
  ]);

  const viewsData = [
    { name: 'Jan', views: 15 },
    { name: 'Feb', views: 22 },
    { name: 'Mar', views: 18 },
    { name: 'Apr', views: 25 },
    { name: 'May', views: 32 },
    { name: 'Jun', views: 28 },
    { name: 'Jul', views: 35 }
  ];

  const sourceData = [
    { name: 'LinkedIn', value: 45 },
    { name: 'Direct Link', value: 30 },
    { name: 'Email', value: 15 },
    { name: 'Other', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    
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
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="resume">Resume Management</TabsTrigger>
            <TabsTrigger value="old-resumes">
              <Archive className="h-4 w-4 mr-2" />
              Past Resumes
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
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
          
          <TabsContent value="old-resumes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Archive className="h-5 w-5 mr-2" />
                  Past Resumes
                </CardTitle>
                <CardDescription>
                  View and manage your previous resume versions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resume Name</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oldResumes.map((resume) => (
                      <TableRow key={resume.id}>
                        <TableCell className="font-medium">{resume.name}</TableCell>
                        <TableCell>{new Date(resume.date).toLocaleDateString()}</TableCell>
                        <TableCell>{resume.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Resume restored",
                                  description: `${resume.name} is now your active resume.`,
                                });
                              }}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    Resume Views Over Time
                  </CardTitle>
                  <CardDescription>
                    Track how your resume views have changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ChartContainer config={{}} className="h-full">
                      <RechartsBarChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" className="fill-foreground" />
                        <YAxis className="fill-foreground" />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border border-border rounded-md p-2 shadow-md">
                                  <p className="text-foreground font-medium">{`${payload[0].payload.name}`}</p>
                                  <p className="text-foreground">{`Views: ${payload[0].value}`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="views" fill="#0088FE" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="h-5 w-5 mr-2" />
                      Daily Traffic
                    </CardTitle>
                    <CardDescription>
                      Daily visitors to your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 w-full">
                      <ChartContainer config={{}} className="h-full">
                        <RechartsLineChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="name" className="fill-foreground" />
                          <YAxis className="fill-foreground" />
                          <ChartTooltip />
                          <Line type="monotone" dataKey="views" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} />
                        </RechartsLineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Traffic Sources
                    </CardTitle>
                    <CardDescription>
                      Where your resume views are coming from
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 w-full">
                      <ChartContainer config={{}} className="h-full">
                        <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <Pie
                            data={sourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </RechartsPieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Total Views</p>
                      <p className="text-3xl font-bold text-brand-blue">427</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Average Time on Page</p>
                      <p className="text-3xl font-bold text-brand-blue">2:45</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Unique Visitors</p>
                      <p className="text-3xl font-bold text-brand-blue">318</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
