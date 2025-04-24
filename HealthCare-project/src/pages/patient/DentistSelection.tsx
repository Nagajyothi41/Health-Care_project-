
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for dentists
const mockDentists = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry',
    experience: '15 years',
    rating: 4.8,
    location: 'Downtown Clinic',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80'
  },
  {
    id: 'd2',
    name: 'Dr. Michael Lee',
    specialty: 'Orthodontics',
    experience: '10 years',
    rating: 4.5,
    location: 'Westside Dental Center',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: 'Periodontics',
    experience: '12 years',
    rating: 4.9,
    location: 'Eastside Family Dental',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80'
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Pediatric Dentistry',
    experience: '8 years',
    rating: 4.7,
    location: 'Children\'s Dental Clinic',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80'
  }
];

const DentistSelection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  
  const filteredDentists = mockDentists.filter(dentist => 
    dentist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId === selectedDentistId ? null : dentistId);
  };

  const handleRequestCheckup = () => {
    if (!selectedDentistId) {
      toast.error("Please select a dentist first");
      return;
    }

    // In a real app, this would be an API call to create a checkup request
    toast.success("Checkup request sent successfully!");
    navigate("/patient/dashboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Find a Dentist</h1>
        <p className="text-gray-600">Browse our network of qualified dental professionals</p>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search by name, specialty, or location..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Dentist List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDentists.length > 0 ? (
          filteredDentists.map((dentist) => (
            <Card 
              key={dentist.id} 
              className={`overflow-hidden hover:shadow-md transition-shadow ${
                selectedDentistId === dentist.id ? 'border-2 border-dental-blue' : ''
              }`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={dentist.image} 
                  alt={dentist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{dentist.name}</CardTitle>
                <CardDescription>{dentist.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Experience:</span>
                    <span className="text-sm font-medium">{dentist.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Rating:</span>
                    <span className="text-sm font-medium">{dentist.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Location:</span>
                    <span className="text-sm font-medium">{dentist.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedDentistId === dentist.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectDentist(dentist.id)}
                >
                  {selectedDentistId === dentist.id ? "Selected" : "Select Dentist"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No dentists found matching your search criteria.</p>
          </div>
        )}
      </div>
      
      {/* Action Button */}
      {selectedDentistId && (
        <div className="flex justify-end">
          <Button 
            size="lg"
            className="bg-dental-blue hover:bg-dental-blue/90"
            onClick={handleRequestCheckup}
          >
            Request Checkup
          </Button>
        </div>
      )}
    </div>
  );
};

export default DentistSelection;
