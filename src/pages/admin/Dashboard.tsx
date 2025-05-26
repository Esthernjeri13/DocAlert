import React from 'react';
import { BarChart2, Users, Calendar, BarChart, Activity, ArrowUp, ArrowDown, Bell } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// Mock data for analytics
const appointmentsByDayData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 19 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 18 },
  { day: 'Fri', count: 22 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 5 },
];

const reminderChannelData = [
  { name: 'SMS', value: 45 },
  { name: 'Email', value: 35 },
  { name: 'WhatsApp', value: 15 },
  { name: 'Push', value: 5 },
];

const appointmentStatusData = [
  { name: 'Confirmed', value: 65 },
  { name: 'Scheduled', value: 20 },
  { name: 'Cancelled', value: 10 },
  { name: 'No-show', value: 5 },
];

const CHANNEL_COLORS = ['#2E8BC0', '#0E9AA7', '#5CCD5C', '#FFC300'];
const STATUS_COLORS = ['#5CCD5C', '#2E8BC0', '#FF6B6B', '#FFC300'];

const AdminDashboard: React.FC = () => {
  // Stats
  const stats = {
    totalDoctors: 12,
    totalPatients: 324,
    totalAppointments: 567,
    remindersDelivered: 1240,
    confirmedRate: 87,
    noShowRate: 4,
  };
  
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">Admin Dashboard</h1>
            <p className="text-neutral-500">System overview and analytics</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button
              variant="outline"
              onClick={() => {/* Navigate to reports */}}
              icon={<BarChart size={18} />}
            >
              Reports
            </Button>
            <Button
              variant="primary"
              onClick={() => {/* Export data */}}
            >
              Export Data
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border border-neutral-200">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Users size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Doctors</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-neutral-900 mr-2">{stats.totalDoctors}</p>
                  <span className="text-xs text-success-600 flex items-center">
                    <ArrowUp size={12} />
                    2
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-neutral-200">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <Users size={24} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Patients</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-neutral-900 mr-2">{stats.totalPatients}</p>
                  <span className="text-xs text-success-600 flex items-center">
                    <ArrowUp size={12} />
                    15
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-neutral-200">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-success-100 p-3 mr-4">
                <Calendar size={24} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Appointments</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-neutral-900 mr-2">{stats.totalAppointments}</p>
                  <span className="text-xs text-success-600 flex items-center">
                    <ArrowUp size={12} />
                    32
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-neutral-200">
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <Bell size={24} className="text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Reminders Delivered</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-neutral-900 mr-2">{stats.remindersDelivered}</p>
                  <span className="text-xs text-success-600 flex items-center">
                    <ArrowUp size={12} />
                    124
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Appointment Success Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Activity size={18} className="mr-2 text-primary-500" />
                Appointment Performance
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-success-50 rounded-lg border border-success-100">
                  <p className="text-sm text-neutral-700 mb-1">Confirmation Rate</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-success-700">{stats.confirmedRate}%</p>
                    <span className="ml-2 text-xs text-success-600 flex items-center mb-1">
                      <ArrowUp size={12} className="mr-1" />
                      3%
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">vs last month</p>
                </div>
                
                <div className="p-4 bg-error-50 rounded-lg border border-error-100">
                  <p className="text-sm text-neutral-700 mb-1">No-show Rate</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-error-700">{stats.noShowRate}%</p>
                    <span className="ml-2 text-xs text-success-600 flex items-center mb-1">
                      <ArrowDown size={12} className="mr-1" />
                      1.5%
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">vs last month</p>
                </div>
              </div>
              
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {appointmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <BarChart2 size={18} className="mr-2 text-primary-500" />
                Appointments by Day
              </h2>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={appointmentsByDayData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2E8BC0" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Reminder Stats */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
              <Bell size={18} className="mr-2 text-primary-500" />
              Reminder Analytics
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium text-neutral-900 mb-4">Reminder Delivery by Channel</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reminderChannelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {reminderChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-neutral-900 mb-4">Reminder Effectiveness</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">Sent</span>
                      <span className="text-sm font-medium text-neutral-700">98%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">Delivered</span>
                      <span className="text-sm font-medium text-neutral-700">95%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-secondary-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">Read</span>
                      <span className="text-sm font-medium text-neutral-700">87%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">Response Rate</span>
                      <span className="text-sm font-medium text-neutral-700">72%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
                    <p className="text-sm text-neutral-600">Avg. Response Time</p>
                    <p className="text-lg font-semibold text-neutral-900">3.2 hours</p>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
                    <p className="text-sm text-neutral-600">Confirmation Rate</p>
                    <p className="text-lg font-semibold text-success-700">87%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default AdminDashboard;