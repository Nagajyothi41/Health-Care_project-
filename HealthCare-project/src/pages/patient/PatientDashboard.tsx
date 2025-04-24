
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, User, FileText } from 'lucide-react';

// Mock data for checkups
const mockCheckups = [
  { 
    id: 'chk1', 
    dentistName: 'Dr. Sarah Johnson',
    date: '2025-05-10', 
    status: 'completed',
    hasResults: true 
  },
  { 
    id: 'chk2', 
    dentistName: 'Dr. Michael Lee',
    date: '2025-04-15', 
    status: 'pending',
    hasResults: false
  },
  { 
    id: 'chk3', 
    dentistName: 'Dr. Sarah Johnson', 
    date: '2025-03-05', 
    status: 'completed',
    hasResults: true
  }
];

const PatientDashboard = () => {
  const { user } = useAuth();
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
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
        <p className="text-gray-600">Manage your dental checkups and view results</p>
      </div>
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-dental-light-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-dental-blue text-lg">Upcoming Checkups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-dental-blue">{mockCheckups.filter(c => c.status === 'pending').length}</span>
              <Calendar className="h-8 w-8 text-dental-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dental-light-mint">
          <CardHeader className="pb-2">
            <CardTitle className="text-dental-mint text-lg">Past Checkups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-dental-mint">{mockCheckups.filter(c => c.status === 'completed').length}</span>
              <FileText className="h-8 w-8 text-dental-mint" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Find a Dentist</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-sm text-gray-500">Looking for a new dentist?</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => navigate('/patient/dentists')}
            >
              <User className="mr-2 h-4 w-4" />
              Browse Dentists
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Checkup List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Checkups</h2>
        <div className="space-y-4">
          {mockCheckups.length > 0 ? (
            mockCheckups.map((checkup) => (
              <Card key={checkup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                    <div>
                      <p className="font-medium">{checkup.dentistName}</p>
                      <p className="text-sm text-gray-500">{formatDate(checkup.date)}</p>
                      <span 
                        className={`inline-block text-xs rounded-full px-2 py-1 mt-2 ${
                          checkup.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {checkup.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {checkup.hasResults ? (
                        <Button 
                          className="bg-dental-blue hover:bg-dental-blue/90"
                          onClick={() => navigate(`/patient/results/${checkup.id}`)}
                        >
                          View Results
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          No Results Yet
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No checkups found.</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/patient/dentists')}
              >
                Schedule a Checkup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
