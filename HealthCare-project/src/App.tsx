
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DentistSelection from "./pages/patient/DentistSelection";
import CheckupResults from "./pages/patient/CheckupResults";
import DentistDashboard from "./pages/dentist/DentistDashboard";
import PatientCheckup from "./pages/dentist/PatientCheckup";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Layout and Protected Routes
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Patient Routes */}
            <Route path="/patient" element={<Layout userType="patient" />}>
              <Route path="dashboard" element={
                <PrivateRoute userType="patient">
                  <PatientDashboard />
                </PrivateRoute>
              } />
              <Route path="dentists" element={
                <PrivateRoute userType="patient">
                  <DentistSelection />
                </PrivateRoute>
              } />
              <Route path="results/:checkupId" element={
                <PrivateRoute userType="patient">
                  <CheckupResults />
                </PrivateRoute>
              } />
            </Route>
            
            {/* Dentist Routes */}
            <Route path="/dentist" element={<Layout userType="dentist" />}>
              <Route path="dashboard" element={
                <PrivateRoute userType="dentist">
                  <DentistDashboard />
                </PrivateRoute>
              } />
              <Route path="checkup/:checkupId" element={
                <PrivateRoute userType="dentist">
                  <PatientCheckup />
                </PrivateRoute>
              } />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
