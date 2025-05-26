import React, { useState } from 'react';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, User } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AppointmentCard from '../../components/appointments/AppointmentCard';
import { Appointment } from '../../types';
import Select from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for patient dashboard
const mockAppointments: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    title: 'Follow-up Consultation with Dr. Johnson',
    date: new Date().toISOString(),
    time: '09:00',
    duration: 30,
    status: 'scheduled',
    notes: 'Review progress after medication change.',
    type: 'follow-up',
    location: 'Room 105',
    reminderSettings: {
      channels: ['email', 'sms'],
      schedule: [
        { type: 'days', value: 1, sent: false },
        { type: 'hours', value: 2, sent: false },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'appt4',
    patientId: 'patient1',
    doctorId: 'doctor2',
    title: 'Annual Physical with Dr. Rodriguez',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    time: '10:30',
    duration: 60,
    status: 'scheduled',
    type: 'check-up',
    location: 'Room 202',
    reminderSettings: {
      channels: ['email', 'sms', 'whatsapp'],
      schedule: [
        { type: 'days', value: 3, sent: false },
        { type: 'days', value: 1, sent: false },
        { type: 'hours', value: 2, sent: false },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

// Mock past appointments
const mockPastAppointments: Appointment[] = [
  {
    id: 'past1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    title: 'Initial Consultation with Dr. Johnson',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    time: '14:00',
    duration: 45,
    status: 'completed',
    notes: 'Initial diagnosis and treatment plan.',
    type: 'initial',
    location: 'Room 105',
    reminderSettings: {
      channels: ['email', 'sms'],
      schedule: [
        { type: 'days', value: 1, sent: true },
        { type: 'hours', value: 2, sent: true },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'past2',
    patientId: 'patient1',
    doctorId: 'doctor3',
    title: 'Dental Check-up with Dr. Adams',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    time: '11:30',
    duration: 30,
    status: 'completed',
    type: 'check-up',
    location: 'Dental Wing, Room D3',
    reminderSettings: {
      channels: ['email'],
      schedule: [
        { type: 'days', value: 1, sent: true },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
];

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewHistory, setViewHistory] = useState(false);
  
  // Filter appointments based on status
  const filteredAppointments = (viewHistory ? mockPastAppointments : mockAppointments).filter(appointment => {
    return filterStatus === 'all' || appointment.status === filterStatus;
  });
  
  // Dashboard statistics
  const stats = {
    upcomingAppointments: mockAppointments.length,
    pendingConfirmation: mockAppointments.filter(a => a.status === 'scheduled').length,
    totalReminders: mockAppointments.reduce((total, appt) => total + appt.reminderSettings.schedule.length, 0),
    completedAppointments: mockPastAppointments.filter(a => a.status === 'completed').length,
  };
  
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Welcome, {user?.name}</h1>
          <p className="text-neutral-500">Manage your appointments and reminders</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-primary-50 border border-primary-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-primary-700">{stats.upcomingAppointments}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-warning-50 border border-warning-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <Clock size={24} className="text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Pending Confirmation</p>
                <p className="text-2xl font-bold text-warning-700">{stats.pendingConfirmation}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary-50 border border-secondary-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <Bell size={24} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Active Reminders</p>
                <p className="text-2xl font-bold text-secondary-700">{stats.totalReminders}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-success-50 border border-success-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-success-100 p-3 mr-4">
                <CheckCircle size={24} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Completed Visits</p>
                <p className="text-2xl font-bold text-success-700">{stats.completedAppointments}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Appointments Section */}
        <Card className="mb-6">
          <CardHeader className="bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Calendar size={18} className="mr-2 text-primary-500" />
                {viewHistory ? 'Appointment History' : 'Upcoming Appointments'}
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                <Select
                  id="status-filter"
                  value={filterStatus}
                  onChange={setFilterStatus}
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'scheduled', label: 'Scheduled' },
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                  className="m-0"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewHistory(!viewHistory)}
                >
                  {viewHistory ? 'View Upcoming' : 'View History'}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="patient"
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-neutral-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                  {viewHistory ? 'No past appointments found' : 'No upcoming appointments'}
                </h3>
                <p className="text-neutral-500 mb-4">
                  {viewHistory 
                    ? 'You don\'t have any past appointments to display'
                    : 'You don\'t have any upcoming appointments scheduled'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Bell size={18} className="mr-2 text-primary-500" />
                Notification Preferences
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {/* Navigate to settings */}}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                <div className="flex items-center">
                  <span className="mr-3 text-primary-500">
                    <Bell size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Email Notifications</p>
                    <p className="text-xs text-neutral-500">john.doe@example.com</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                  Enabled
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                <div className="flex items-center">
                  <span className="mr-3 text-primary-500">
                    <Bell size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">SMS Notifications</p>
                    <p className="text-xs text-neutral-500">+1 (987) 654-3210</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                  Enabled
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                <div className="flex items-center">
                  <span className="mr-3 text-primary-500">
                    <Bell size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">WhatsApp Notifications</p>
                    <p className="text-xs text-neutral-500">+1 (987) 654-3210</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-error-100 text-error-800 rounded-full text-xs font-medium">
                  Disabled
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                <div className="flex items-center">
                  <span className="mr-3 text-primary-500">
                    <Bell size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Push Notifications</p>
                    <p className="text-xs text-neutral-500">In-app notifications</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">
                  Enabled
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default PatientDashboard;