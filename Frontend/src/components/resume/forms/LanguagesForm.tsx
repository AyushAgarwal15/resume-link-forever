
import { useState } from "react";
import { useResumeStore, Language } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LanguagesForm = () => {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Language, 'id'>>({
    name: '',
    level: 'intermediate'
  });
  
  const languageLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' }
  ];
  
  const resetForm = () => {
    setFormData({
      name: '',
      level: 'intermediate'
    });
  };
  
  const handleAddNew = () => {
    setIsAdding(true);
    resetForm();
  };
  
  const handleEdit = (language: Language) => {
    setEditingId(language.id);
    setFormData({
      name: language.name,
      level: language.level
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
      updateLanguage(editingId, formData);
      setEditingId(null);
    } else {
      addLanguage(formData);
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      {/* List of existing languages */}
      {languages.length > 0 && (
        <div className="space-y-4">
          {languages.map((language) => (
            <Card key={language.id} className="bg-gray-700/30 border-gray-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{language.name}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(language)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeLanguage(language.id)}
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
                  Proficiency: {languageLevels.find(l => l.value === language.level)?.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Form for adding/editing languages */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
          <h3 className="text-lg font-medium">
            {editingId ? 'Edit Language' : 'Add Language'}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Language Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. English, Spanish, Chinese"
              required
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Proficiency Level *</Label>
            <Select 
              value={formData.level} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, level: value as Language['level'] }))}
            >
              <SelectTrigger id="level" className="bg-gray-700/30 border-gray-600">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {languageLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {editingId ? 'Update' : 'Add'} Language
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
          Add Language
        </Button>
      )}
      
      {languages.length === 0 && !isAdding && (
        <p className="text-sm text-gray-400 text-center mt-4">
          No languages added yet. Click the button above to add languages you speak.
        </p>
      )}
    </div>
  );
};

export default LanguagesForm;
