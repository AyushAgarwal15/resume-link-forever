
import { useState } from "react";
import { useResumeStore, WorkExperience } from "@/store/resume-store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit2, ChevronUp, ChevronDown, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const WorkExperienceForm = () => {
  const { workExperiences, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WorkExperience, 'id'>>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: [''],
  });
  
  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: [''],
    });
  };
  
  const handleAddNew = () => {
    setIsAdding(true);
    resetForm();
  };
  
  const handleEdit = (experience: WorkExperience) => {
    setEditingId(experience.id);
    setFormData({
      company: experience.company,
      role: experience.role,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      responsibilities: [...experience.responsibilities],
    });
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty responsibilities
    const cleanedResponsibilities = formData.responsibilities.filter(r => r.trim() !== '');
    
    if (editingId) {
      updateWorkExperience(editingId, { ...formData, responsibilities: cleanedResponsibilities });
      setEditingId(null);
    } else {
      addWorkExperience({ ...formData, responsibilities: cleanedResponsibilities });
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const addResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };
  
  const updateResponsibility = (index: number, value: string) => {
    setFormData(prev => {
      const updatedResponsibilities = [...prev.responsibilities];
      updatedResponsibilities[index] = value;
      return { ...prev, responsibilities: updatedResponsibilities };
    });
  };
  
  const removeResponsibility = (index: number) => {
    setFormData(prev => {
      const updatedResponsibilities = [...prev.responsibilities];
      updatedResponsibilities.splice(index, 1);
      return { ...prev, responsibilities: updatedResponsibilities };
    });
  };
  
  const moveResponsibility = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.responsibilities.length - 1)
    ) {
      return;
    }
    
    setFormData(prev => {
      const updatedResponsibilities = [...prev.responsibilities];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      // Swap the items
      [updatedResponsibilities[index], updatedResponsibilities[newIndex]] = 
      [updatedResponsibilities[newIndex], updatedResponsibilities[index]];
      
      return { ...prev, responsibilities: updatedResponsibilities };
    });
  };
  
  return (
    <div className="space-y-6">
      {/* List of existing work experiences */}
      {workExperiences.length > 0 && (
        <div className="space-y-4">
          {workExperiences.map((experience) => (
            <Card key={experience.id} className="bg-gray-700/30 border-gray-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{experience.role} at {experience.company}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(experience)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeWorkExperience(experience.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 text-sm text-gray-300">
                <p>
                  {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                </p>
                {experience.description && (
                  <p className="mt-2">{experience.description}</p>
                )}
                {experience.responsibilities.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {experience.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Form for adding/editing work experiences */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
          <h3 className="text-lg font-medium">
            {editingId ? 'Edit Work Experience' : 'Add Work Experience'}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company Name"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Job Title *</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Job Title"
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
                  I currently work here
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Brief Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of your role (optional)"
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Key Responsibilities (ATS-optimized bullet points) *</Label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveResponsibility(index, 'up')}
                    disabled={index === 0}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span className="sr-only">Move Up</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveResponsibility(index, 'down')}
                    disabled={index === formData.responsibilities.length - 1}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Move Down</span>
                  </Button>
                </div>
                <Textarea
                  value={resp}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                  placeholder="Describe a key responsibility or achievement (use action verbs)"
                  className="bg-gray-700/30 border-gray-600 flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeResponsibility(index)}
                  disabled={formData.responsibilities.length <= 1}
                  className="h-9 w-9 p-0 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addResponsibility}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Responsibility
            </Button>
            <p className="text-xs text-gray-400 mt-1">
              Pro tip: Start each bullet with action verbs (e.g., Developed, Managed, Increased).
              Include metrics and achievements where possible.
            </p>
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
              {editingId ? 'Update' : 'Add'} Experience
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
          Add Work Experience
        </Button>
      )}
      
      {workExperiences.length === 0 && !isAdding && (
        <p className="text-sm text-gray-400 text-center mt-4">
          No work experience added yet. Click the button above to add your first position.
        </p>
      )}
    </div>
  );
};

export default WorkExperienceForm;
