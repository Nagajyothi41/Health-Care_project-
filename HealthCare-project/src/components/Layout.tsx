
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, Home, Calendar, LogOut } from 'lucide-react';

interface LayoutProps {
  userType: 'patient' | 'dentist';
}

const Layout: React.FC<LayoutProps> = ({ userType }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = userType === 'patient' 
    ? [
        { icon: <Home className="mr-2 h-4 w-4" />, label: 'Dashboard', path: '/patient/dashboard' },
        { icon: <User className="mr-2 h-4 w-4" />, label: 'Find Dentists', path: '/patient/dentists' },
      ]
    : [
        { icon: <Home className="mr-2 h-4 w-4" />, label: 'Dashboard', path: '/dentist/dashboard' },
        { icon: <Calendar className="mr-2 h-4 w-4" />, label: 'Checkups', path: '/dentist/dashboard' },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-dental-blue flex items-center justify-center mr-2">
              <span className="text-white font-bold">SD</span>
            </div>
            <NavLink to="/" className="text-xl font-bold text-dental-blue">
              SmileSparkDental
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center">
                <div className="mr-4 text-sm">
                  <span className="text-gray-500">Welcome,</span> 
                  <span className="ml-1 font-medium">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-dental-blue"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm hidden md:block">
          <div className="p-4">
            <div className="py-2 px-4 bg-dental-light-blue rounded-md mb-4">
              <p className="font-medium text-dental-blue">
                {userType === 'patient' ? 'Patient Portal' : 'Dentist Portal'}
              </p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive
                        ? 'bg-dental-blue text-white'
                        : 'text-gray-700 hover:bg-dental-light-blue hover:text-dental-blue'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
