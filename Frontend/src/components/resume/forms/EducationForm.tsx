
import { useState } from "react";
import { useResumeStore, Education } from "@/store/resume-store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const EducationForm = () => {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };
  
  const handleAddNew = () => {
    setIsAdding(true);
    resetForm();
  };
  
  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.current,
      description: edu.description
    });
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      addEducation(formData);
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      {/* List of existing education entries */}
      {education.length > 0 && (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="bg-gray-700/30 border-gray-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{edu.degree}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(edu)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeEducation(edu.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 text-sm text-gray-300">
                <p className="font-medium">{edu.institution}</p>
                <p>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
                {edu.description && (
                  <p className="mt-2">{edu.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Form for adding/editing education */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
          <h3 className="text-lg font-medium">
            {editingId ? 'Edit Education' : 'Add Education'}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree/Certificate *</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                placeholder="Bachelor of Science in Computer Science"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="University Name"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date {!formData.current && '*'}</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                required={!formData.current}
                disabled={formData.current}
                className="bg-gray-700/30 border-gray-600"
              />
              <div className="flex items-center space-x-2 mt-1">
                <Checkbox 
                  id="current" 
                  name="current"
                  checked={formData.current}
                  onCheckedChange={(checked) => {
                    setFormData(prev => ({ ...prev, current: checked as boolean }));
                  }}
                />
                <label htmlFor="current" className="text-sm text-gray-300 cursor-pointer">
                  I am currently studying here
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Additional Information</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Additional details like GPA, honors, relevant coursework, etc. (optional)"
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-teal hover:bg-brand-teal/90"
            >
              <Save className="h-4 w-4 mr-1" />
              {editingId ? 'Update' : 'Add'} Education
            </Button>
          </div>
        </form>
      )}
      
      {/* Add new button (only show if not already adding) */}
      {!isAdding && !editingId && (
        <Button 
          onClick={handleAddNew} 
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      )}
      
      {education.length === 0 && !isAdding && (
        <p className="text-sm text-gray-400 text-center mt-4">
          No education entries added yet. Click the button above to add your education.
        </p>
      )}
    </div>
  );
};

export default EducationForm;
