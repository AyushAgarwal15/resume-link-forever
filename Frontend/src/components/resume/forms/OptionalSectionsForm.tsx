
import { useState } from "react";
import { useResumeStore, Reference } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const OptionalSectionsForm = () => {
  const { 
    hobbies, awards, references, 
    updateHobbies, updateAwards, 
    addReference, updateReference, removeReference 
  } = useResumeStore();
  
  const [activeTab, setActiveTab] = useState("hobbies");
  
  // Hobbies state
  const [hobby, setHobby] = useState("");
  
  // Awards state
  const [award, setAward] = useState("");
  
  // References state
  const [isAddingRef, setIsAddingRef] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [refFormData, setRefFormData] = useState<Omit<Reference, 'id'>>({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: ''
  });
  
  // Hobbies handlers
  const addHobby = () => {
    if (hobby.trim()) {
      updateHobbies([...hobbies, hobby.trim()]);
      setHobby("");
    }
  };
  
  const removeHobby = (indexToRemove: number) => {
    updateHobbies(hobbies.filter((_, index) => index !== indexToRemove));
  };
  
  // Awards handlers
  const addAward = () => {
    if (award.trim()) {
      updateAwards([...awards, award.trim()]);
      setAward("");
    }
  };
  
  const removeAward = (indexToRemove: number) => {
    updateAwards(awards.filter((_, index) => index !== indexToRemove));
  };
  
  // References handlers
  const resetRefForm = () => {
    setRefFormData({
      name: '',
      company: '',
      position: '',
      email: '',
      phone: ''
    });
  };
  
  const handleAddNewRef = () => {
    setIsAddingRef(true);
    resetRefForm();
  };
  
  const handleEditRef = (ref: Reference) => {
    setEditingRefId(ref.id);
    setRefFormData({
      name: ref.name,
      company: ref.company,
      position: ref.position,
      email: ref.email,
      phone: ref.phone || ''
    });
  };
  
  const handleCancelRef = () => {
    setIsAddingRef(false);
    setEditingRefId(null);
    resetRefForm();
  };
  
  const handleSubmitRef = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty optional fields
    const cleanedData = { ...refFormData };
    if (!cleanedData.phone) delete cleanedData.phone;
    
    if (editingRefId) {
      updateReference(editingRefId, cleanedData);
      setEditingRefId(null);
    } else {
      addReference(cleanedData);
      setIsAddingRef(false);
    }
    
    resetRefForm();
  };
  
  const handleRefInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRefFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div>
      <Tabs defaultValue="hobbies" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="hobbies">Hobbies</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        
        {/* Hobbies Tab */}
        <TabsContent value="hobbies" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                placeholder="Add a hobby or interest"
                className="bg-gray-700/30 border-gray-600 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHobby();
                  }
                }}
              />
              <Button 
                onClick={addHobby}
                disabled={!hobby.trim()}
              >
                Add
              </Button>
            </div>
            
            {hobbies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {hobbies.map((item, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="flex items-center gap-1 py-1.5"
                  >
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHobby(index)}
                      className="h-4 w-4 p-0 ml-1 -mr-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-2">
                No hobbies added yet. Adding personal interests can make your resume more relatable.
              </p>
            )}
          </div>
        </TabsContent>
        
        {/* Awards Tab */}
        <TabsContent value="awards" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={award}
                onChange={(e) => setAward(e.target.value)}
                placeholder="Add an award or recognition"
                className="bg-gray-700/30 border-gray-600 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAward();
                  }
                }}
              />
              <Button 
                onClick={addAward}
                disabled={!award.trim()}
              >
                Add
              </Button>
            </div>
            
            {awards.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {awards.map((item, index) => (
                  <li key={index} className="flex items-center justify-between group">
                    <span>{item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAward(index)}
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-destructive"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 mt-2">
                No awards added yet. Awards and recognitions can highlight your achievements.
              </p>
            )}
          </div>
        </TabsContent>
        
        {/* References Tab */}
        <TabsContent value="references" className="space-y-4 mt-4">
          {/* List of existing references */}
          {references.length > 0 && (
            <div className="space-y-4">
              {references.map((ref) => (
                <Card key={ref.id} className="bg-gray-700/30 border-gray-600">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>{ref.name}</span>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditRef(ref)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeReference(ref.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm text-gray-300">
                    <p className="font-medium">{ref.position} at {ref.company}</p>
                    <p>Email: {ref.email}</p>
                    {ref.phone && <p>Phone: {ref.phone}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Form for adding/editing references */}
          {(isAddingRef || editingRefId) && (
            <form onSubmit={handleSubmitRef} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
              <h3 className="text-lg font-medium">
                {editingRefId ? 'Edit Reference' : 'Add Reference'}
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={refFormData.name}
                    onChange={handleRefInputChange}
                    placeholder="John Doe"
                    required
                    className="bg-gray-700/30 border-gray-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    name="position"
                    value={refFormData.position}
                    onChange={handleRefInputChange}
                    placeholder="Senior Manager"
                    required
                    className="bg-gray-700/30 border-gray-600"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={refFormData.company}
                  onChange={handleRefInputChange}
                  placeholder="Acme Inc."
                  required
                  className="bg-gray-700/30 border-gray-600"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={refFormData.email}
                    onChange={handleRefInputChange}
                    placeholder="john.doe@example.com"
                    required
                    className="bg-gray-700/30 border-gray-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={refFormData.phone}
                    onChange={handleRefInputChange}
                    placeholder="(123) 456-7890"
                    className="bg-gray-700/30 border-gray-600"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelRef}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-teal hover:bg-brand-teal/90"
                >
                  <Save className="h-4 w-4 mr-1" />
                  {editingRefId ? 'Update' : 'Add'} Reference
                </Button>
              </div>
            </form>
          )}
          
          {/* Add new button (only show if not already adding) */}
          {!isAddingRef && !editingRefId && (
            <Button 
              onClick={handleAddNewRef} 
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          )}
          
          {references.length === 0 && !isAddingRef && (
            <p className="text-sm text-gray-400 text-center mt-4">
              No references added yet. References can strengthen your application.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OptionalSectionsForm;
