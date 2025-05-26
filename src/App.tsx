import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientDashboard from './pages/patient/Dashboard';
import AppointmentDetails from './pages/appointments/AppointmentDetails';
import AppointmentForm from './pages/appointments/AppointmentForm';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Doctor Routes */}
            <Route 
              path="/doctor/*" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <Routes>
                    <Route path="/" element={<DoctorDashboard />} />
                    <Route path="/appointment/:id" element={<AppointmentDetails />} />
                    <Route path="/appointment/new" element={<AppointmentForm />} />
                    <Route path="/appointment/edit/:id" element={<AppointmentForm />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Patient Routes */}
            <Route 
              path="/patient/*" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <Routes>
                    <Route path="/" element={<PatientDashboard />} />
                    <Route path="/appointment/:id" element={<AppointmentDetails />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;