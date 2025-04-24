
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Image, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for a patient whose checkup needs results
const mockPatientData = {
  id: 'p6',
  name: 'Robert Garcia',
  age: 35,
  lastCheckup: '2024-10-15'
};

interface CheckupImage {
  id: string;
  file: File | null;
  preview: string;
  description: string;
}

const PatientCheckup = () => {
  const navigate = useNavigate();
  const { checkupId } = useParams<{ checkupId: string }>();
  
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<CheckupImage[]>([
    { id: '1', file: null, preview: '', description: '' }
  ]);
  const [recommendations, setRecommendations] = useState(['', '', '']);
  
  const handleAddImage = () => {
    setImages([...images, {
      id: Date.now().toString(),
      file: null,
      preview: '',
      description: ''
    }]);
  };
  
  const handleRemoveImage = (id: string) => {
    if (images.length > 1) {
      setImages(images.filter(img => img.id !== id));
    } else {
      toast.error("You must have at least one image");
    }
  };
  
  const handleImageChange = (id: string, file: File | null) => {
    if (!file) return;

    setImages(images.map(img => {
      if (img.id === id) {
        return {
          ...img,
          file,
          preview: URL.createObjectURL(file)
        };
      }
      return img;
    }));
  };
  
  const handleDescriptionChange = (id: string, description: string) => {
    setImages(images.map(img => {
      if (img.id === id) {
        return { ...img, description };
      }
      return img;
    }));
  };
  
  const handleRecommendationChange = (index: number, value: string) => {
    const newRecommendations = [...recommendations];
    newRecommendations[index] = value;
    setRecommendations(newRecommendations);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (notes.trim() === '') {
      toast.error("Please add checkup notes");
      return;
    }
    
    const validImages = images.filter(img => img.file && img.description.trim() !== '');
    if (validImages.length === 0) {
      toast.error("Please add at least one image with description");
      return;
    }
    
    const validRecommendations = recommendations.filter(r => r.trim() !== '');
    if (validRecommendations.length === 0) {
      toast.error("Please add at least one recommendation");
      return;
    }
    
    // In a real app, this would be an API call to save the checkup results
    toast.success("Checkup results uploaded successfully");
    navigate("/dentist/dashboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Upload Checkup Results</h1>
        <p className="text-gray-600">Add images and notes for the patient's dental checkup</p>
      </div>
      
      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium">{mockPatientData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{mockPatientData.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Checkup</p>
              <p className="font-medium">{new Date(mockPatientData.lastCheckup).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Checkup Results Form */}
      <form onSubmit={handleSubmit}>
        {/* Checkup Notes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Checkup Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter detailed notes about the patient's dental checkup..."
              className="min-h-32"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
        
        {/* Image Uploads */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Checkup Images</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddImage}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Image
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {images.map((img) => (
                <div key={img.id} className="p-4 border rounded-md relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => handleRemoveImage(img.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <Label htmlFor={`image-${img.id}`}>Upload Image</Label>
                        <div className="mt-1 flex items-center">
                          <label
                            htmlFor={`image-${img.id}`}
                            className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                          >
                            {img.preview ? (
                              <img
                                src={img.preview}
                                alt="Preview"
                                className="h-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <Image className="h-8 w-8 mb-2" />
                                <span className="text-sm">Click to upload an image</span>
                              </div>
                            )}
                            <Input
                              id={`image-${img.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleImageChange(img.id, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`description-${img.id}`}>Image Description</Label>
                      <Textarea
                        id={`description-${img.id}`}
                        placeholder="Provide a detailed description of this image..."
                        className="mt-1"
                        value={img.description}
                        onChange={(e) => handleDescriptionChange(img.id, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Treatment Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-dental-light-blue flex items-center justify-center mr-3">
                    <span className="text-dental-blue font-medium">{index + 1}</span>
                  </div>
                  <Input
                    placeholder={`Recommendation ${index + 1}`}
                    value={recommendation}
                    onChange={(e) => handleRecommendationChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="bg-dental-blue hover:bg-dental-blue/90"
          >
            Upload Results
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientCheckup;
