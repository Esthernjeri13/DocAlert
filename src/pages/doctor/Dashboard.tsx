import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, Plus, Filter, Search, AlertCircle } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AppointmentCard from '../../components/appointments/AppointmentCard';
import { Appointment } from '../../types';
import Select from '../../components/ui/Select';

// Mock data for doctor dashboard
const mockAppointments: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    title: 'Follow-up Consultation',
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
    id: 'appt2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    title: 'Initial Consultation',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    time: '14:30',
    duration: 45,
    status: 'confirmed',
    notes: 'New patient with hypertension.',
    type: 'initial',
    location: 'Room 108',
    reminderSettings: {
      channels: ['email', 'whatsapp'],
      schedule: [
        { type: 'days', value: 1, sent: true },
        { type: 'hours', value: 2, sent: false },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 'appt3',
    patientId: 'patient3',
    doctorId: 'doctor1',
    title: 'Routine Check-up',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    time: '11:15',
    duration: 30,
    status: 'scheduled',
    type: 'check-up',
    location: 'Room 103',
    reminderSettings: {
      channels: ['email'],
      schedule: [
        { type: 'days', value: 2, sent: false },
      ],
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Dashboard statistics
  const stats = {
    totalAppointments: 12,
    pendingConfirmation: 5,
    upcomingToday: 3,
    missedAppointments: 1,
  };
  
  // Filter appointments based on search and filter status
  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">Doctor Dashboard</h1>
            <p className="text-neutral-500">Manage your appointments and patient follow-ups</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              onClick={() => navigate('/doctor/appointment/new')}
              icon={<Plus size={18} />}
            >
              New Appointment
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-primary-50 border border-primary-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Appointments</p>
                <p className="text-2xl font-bold text-primary-700">{stats.totalAppointments}</p>
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
          
          <Card className="bg-success-50 border border-success-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-success-100 p-3 mr-4">
                <Calendar size={24} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-success-700">{stats.upcomingToday}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-error-50 border border-error-100">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-error-100 p-3 mr-4">
                <AlertCircle size={24} className="text-error-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Missed Appointments</p>
                <p className="text-2xl font-bold text-error-700">{stats.missedAppointments}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Appointments */}
        <Card className="mb-6">
          <CardHeader className="bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Calendar size={18} className="mr-2 text-primary-500" />
                Upcoming Appointments
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0">
                <div className="flex-1 min-w-[200px]">
                  <Input 
                    id="search"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search size={18} />}
                    className="m-0"
                  />
                </div>
                
                <div className="w-40">
                  <Select
                    id="status-filter"
                    value={filterStatus}
                    onChange={setFilterStatus}
                    options={[
                      { value: 'all', label: 'All Statuses' },
                      { value: 'scheduled', label: 'Scheduled' },
                      { value: 'confirmed', label: 'Confirmed' },
                      { value: 'cancelled', label: 'Cancelled' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'no-show', label: 'No Show' },
                    ]}
                    className="m-0"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="doctor"
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-neutral-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-1">No appointments found</h3>
                <p className="text-neutral-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  icon={<Filter size={16} />}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Users size={18} className="mr-2 text-primary-500" />
                Recent Patients
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/doctor/patients')}
              >
                View all
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Next Appointment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-600 font-medium">JD</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">John Doe</div>
                          <div className="text-sm text-neutral-500">ID: patient1</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">May 15, 2023</div>
                      <div className="text-sm text-neutral-500">10:30 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      Today, 9:00 AM
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-600 font-medium">EW</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">Emma Wilson</div>
                          <div className="text-sm text-neutral-500">ID: patient3</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">May 10, 2023</div>
                      <div className="text-sm text-neutral-500">2:15 PM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">
                        Needs Follow-up
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      In 3 days, 11:15 AM
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-600 font-medium">MS</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">Michael Smith</div>
                          <div className="text-sm text-neutral-500">ID: patient2</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">May 5, 2023</div>
                      <div className="text-sm text-neutral-500">9:45 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      Tomorrow, 2:30 PM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default DoctorDashboard;