
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { FileText, Download, Image } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for a completed checkup
const mockCheckupData = {
  id: 'chk1',
  patient: {
    id: 'p1',
    name: 'Jane Smith',
  },
  dentist: {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry'
  },
  date: '2025-04-15',
  status: 'completed',
  notes: 'Regular cleaning performed. Minor buildup of plaque on the lower molars. Recommend more attention to flossing in this area. Overall oral health is good.',
  images: [
    { 
      id: 'img1', 
      url: 'https://images.unsplash.com/photo-1580220034938-cddcb889b2c8?auto=format&fit=crop&q=80', 
      description: 'X-ray showing lower right molars with healthy root structures.' 
    },
    { 
      id: 'img2', 
      url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80', 
      description: 'Front view of upper teeth showing good alignment.' 
    }
  ],
  recommendations: [
    'Continue regular brushing twice a day.',
    'Improve flossing technique, especially between lower molars.',
    'Schedule next checkup in 6 months.'
  ]
};

const CheckupResults = () => {
  const { checkupId } = useParams<{ checkupId: string }>();
  const [checkup, setCheckup] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using the mock data
    const fetchCheckup = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        if (checkupId === 'chk1' || checkupId === 'chk3') {
          setCheckup(mockCheckupData);
        } else {
          // Handle non-existent checkup
          toast.error("Checkup not found");
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load checkup data");
        setLoading(false);
      }
    };
    
    fetchCheckup();
  }, [checkupId]);

  const handleExportPdf = () => {
    // In a real app, this would generate a PDF using a library like jsPDF
    toast.success("PDF report generated and downloaded");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading checkup results...</div>;
  }
  
  if (!checkup) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No results found for this checkup.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Checkup Results</h1>
          <p className="text-gray-600">View detailed information about your dental checkup</p>
        </div>
        <Button
          onClick={handleExportPdf}
          className="bg-dental-blue hover:bg-dental-blue/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
      
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Checkup Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Dentist</p>
              <p className="font-medium">{checkup.dentist.name}</p>
              <p className="text-sm text-gray-500 mt-1">{checkup.dentist.specialty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date(checkup.date).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2">Dentist Notes</p>
              <div className="p-4 bg-dental-light-blue rounded-md">
                <p>{checkup.notes}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Details and Images */}
      <Tabs defaultValue="images">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="images">
            <Image className="mr-2 h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <FileText className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {checkup.images.map((image: any) => (
              <Card key={image.id}>
                <div className="h-56 overflow-hidden">
                  <img 
                    src={image.url}
                    alt="Dental checkup result" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <p>{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Dentist Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {checkup.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-baseline">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-dental-blue mr-3 flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheckupResults;
