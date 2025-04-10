
import { useState } from "react";
import { useResumeStore, Certification } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CertificationsForm = () => {
  const { certifications, addCertification, updateCertification, removeCertification } = useResumeStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    expiry: '',
    link: ''
  });
  
  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiry: '',
      link: ''
    });
  };
  
  const handleAddNew = () => {
    setIsAdding(true);
    resetForm();
  };
  
  const handleEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiry: cert.expiry || '',
      link: cert.link || ''
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
    if (!cleanedData.expiry) delete cleanedData.expiry;
    if (!cleanedData.link) delete cleanedData.link;
    
    if (editingId) {
      updateCertification(editingId, cleanedData);
      setEditingId(null);
    } else {
      addCertification(cleanedData);
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
      {/* List of existing certifications */}
      {certifications.length > 0 && (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <Card key={cert.id} className="bg-gray-700/30 border-gray-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{cert.name}</span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(cert)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCertification(cert.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 text-sm text-gray-300">
                <p className="font-medium">{cert.issuer}</p>
                <p>Issued: {cert.date} {cert.expiry && `• Expires: ${cert.expiry}`}</p>
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-teal hover:underline mt-1 inline-block"
                  >
                    View Certificate
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Form for adding/editing certifications */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-600 rounded-lg p-4 bg-gray-700/20">
          <h3 className="text-lg font-medium">
            {editingId ? 'Edit Certification' : 'Add Certification'}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Certification Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. AWS Certified Solutions Architect"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
                placeholder="e.g. Amazon Web Services"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Issue Date *</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                required
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date (if applicable)</Label>
              <Input
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                className="bg-gray-700/30 border-gray-600"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Certificate URL (if available)</Label>
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
              {editingId ? 'Update' : 'Add'} Certification
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
          Add Certification
        </Button>
      )}
      
      {certifications.length === 0 && !isAdding && (
        <p className="text-sm text-gray-400 text-center mt-4">
          No certifications added yet. Click the button above to add your professional certifications.
        </p>
      )}
    </div>
  );
};

export default CertificationsForm;
