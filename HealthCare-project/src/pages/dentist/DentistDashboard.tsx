
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { User, Calendar } from 'lucide-react';

// Mock data for pending checkups
const mockPendingCheckups = [
  {
    id: 'chk2',
    patientName: 'John Doe',
    patientId: 'p2',
    date: '2025-04-28',
    time: '10:00 AM',
    reason: 'Regular Checkup'
  },
  {
    id: 'chk4',
    patientName: 'Emily Wilson',
    patientId: 'p4',
    date: '2025-04-30',
    time: '2:30 PM',
    reason: 'Tooth Pain'
  },
  {
    id: 'chk5',
    patientName: 'Michael Brown',
    patientId: 'p5',
    date: '2025-05-03',
    time: '9:00 AM',
    reason: 'Follow-up'
  }
];

// Mock data for completed checkups waiting for uploads
const mockCompletedCheckups = [
  {
    id: 'chk6',
    patientName: 'Robert Garcia',
    patientId: 'p6',
    date: '2025-04-20',
    needsResults: true
  },
  {
    id: 'chk7',
    patientName: 'Linda Martinez',
    patientId: 'p7',
    date: '2025-04-22',
    needsResults: true
  }
];

const DentistDashboard = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dentist Dashboard</h1>
        <p className="text-gray-600">Manage patient checkups and upload results</p>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-dental-light-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-dental-blue text-lg">Pending Checkups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-dental-blue">{mockPendingCheckups.length}</span>
              <Calendar className="h-8 w-8 text-dental-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dental-light-mint">
          <CardHeader className="pb-2">
            <CardTitle className="text-dental-mint text-lg">Results Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-dental-mint">{mockCompletedCheckups.length}</span>
              <User className="h-8 w-8 text-dental-mint" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{5}</span> {/* In a real app, this would be fetched from the API */}
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Checkups */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Checkups</h2>
        <div className="space-y-4">
          {mockPendingCheckups.length > 0 ? (
            mockPendingCheckups.map((checkup) => (
              <Card key={checkup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-dental-light-blue flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-dental-blue" />
                        </div>
                        <div>
                          <p className="font-medium">{checkup.patientName}</p>
                          <p className="text-sm text-gray-500">{formatDate(checkup.date)} at {checkup.time}</p>
                        </div>
                      </div>
                      <div className="mt-2 ml-12">
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                          {checkup.reason}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button 
                        variant="outline"
                        className="border-dental-blue text-dental-blue hover:bg-dental-light-blue"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No upcoming checkups scheduled.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Results Needed */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Results Pending Upload</h2>
        <div className="space-y-4">
          {mockCompletedCheckups.length > 0 ? (
            mockCompletedCheckups.map((checkup) => (
              <Card key={checkup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-dental-light-mint flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-dental-mint" />
                        </div>
                        <div>
                          <p className="font-medium">{checkup.patientName}</p>
                          <p className="text-sm text-gray-500">Checkup on {formatDate(checkup.date)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button 
                        className="bg-dental-blue hover:bg-dental-blue/90"
                        onClick={() => navigate(`/dentist/checkup/${checkup.id}`)}
                      >
                        Upload Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No checkups waiting for results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DentistDashboard;
