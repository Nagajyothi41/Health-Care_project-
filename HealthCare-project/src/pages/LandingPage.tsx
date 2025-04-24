
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Calendar, User, FileText } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const redirectToDashboard = () => {
    if (user) {
      navigate(`/${user.userType}/dashboard`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-dental-blue flex items-center justify-center mr-2">
              <span className="text-white font-bold">SD</span>
            </div>
            <span className="text-xl font-bold text-dental-blue">SmileSparkDental</span>
          </div>
          <div>
            {user ? (
              <Button 
                variant="default" 
                onClick={() => navigate(`/${user.userType}/dashboard`)}
              >
                Go to Dashboard
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow flex items-center bg-gradient-to-b from-dental-light-blue to-dental-light-mint">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-blue">
                Your Dental Health, Made Simple
              </h1>
              <p className="text-lg text-gray-700">
                Connect with dentists, schedule checkups, and access your dental records all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-dental-blue hover:bg-dental-blue/90"
                  onClick={redirectToDashboard}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-dental-blue text-dental-blue hover:bg-dental-light-blue"
                  onClick={() => navigate('/register')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80"
                alt="Dental checkup"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dental-blue">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dental-light-blue p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <User className="text-dental-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Dentist</h3>
              <p className="text-gray-700">Browse through our network of qualified dentists and find the one that's right for you.</p>
            </div>
            
            <div className="bg-dental-light-mint p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <Calendar className="text-dental-mint h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Request a Checkup</h3>
              <p className="text-gray-700">Schedule your dental appointment quickly and easily through our platform.</p>
            </div>
            
            <div className="bg-dental-light-blue p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <FileText className="text-dental-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Access Results</h3>
              <p className="text-gray-700">View and download your dental checkup results, including images and dentist notes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dental-blue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mr-2">
                  <span className="text-dental-blue font-bold">SD</span>
                </div>
                <span className="text-xl font-bold">SmileSparkDental</span>
              </div>
            </div>
            <div>
              <p>&copy; 2025 SmileSparkDental. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
