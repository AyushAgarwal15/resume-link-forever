
import { useState } from "react";
import { useResumeStore, Project } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsForm = () => {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    link: '',
    technologies: []
  });
  const [techInput, setTechInput] = useState('');
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      link: '',
      technologies: []
    });
    setTechInput('');
  };
  
  const handleAddNew = () => {
    setIsAdding(true);
    resetForm();
  };
  
  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      link: project.link || '',
      technologies: [...project.technologies]
    });
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty optional fields
    const cleanedData = { ...formData };
    if (!cleanedData.link) delete cleanedData.link;
    
    if (editingId) {
      updateProject(editingId, cleanedData);
      setEditingId(null);
    } else {
      addProject(cleanedData);
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };
  
  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };
  
  return (
    <div className="space-y-6">
      {/* List of existing projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-700/30 border-gray-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{project.name}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeProject(project.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 text-sm text-gray-300">
                <p>{project.description}</p>
                
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-teal hover:underline mt-1 inline-block"
                  >
                    View Project
                  </a>
                )}
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="text-xs py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Form for adding/editing projects */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
          <h3 className="text-lg font-medium">
            {editingId ? 'Edit Project' : 'Add Project'}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. E-commerce Website"
              required
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the project, your role, and key achievements..."
              required
              className="bg-gray-700/30 border-gray-600 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Project URL (if available)</Label>
            <Input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://..."
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                id="technologies"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. React, Node.js"
                className="bg-gray-700/30 border-gray-600 flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddTechnology}
                disabled={!techInput.trim()}
              >
                Add
              </Button>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.technologies.map((tech, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary"
                    className="flex items-center gap-1 py-1"
                  >
                    {tech}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="h-4 w-4 p-0 ml-1 -mr-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
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
              {editingId ? 'Update' : 'Add'} Project
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
          Add Project
        </Button>
      )}
      
      {projects.length === 0 && !isAdding && (
        <p className="text-sm text-gray-400 text-center mt-4">
          No projects added yet. Click the button above to showcase your work.
        </p>
      )}
    </div>
  );
};

export default ProjectsForm;
