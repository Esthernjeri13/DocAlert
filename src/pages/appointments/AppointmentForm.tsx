import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, User, MapPin, FileText, Save, X, AlertTriangle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import AppShell from '../../components/layout/AppShell';
import { Card, CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import ReminderSettings from '../../components/appointments/ReminderSettings';
import { AppointmentType, ReminderSettings as ReminderSettingsType } from '../../types';

interface AppointmentFormData {
  title: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  location: string;
  notes: string;
}

const AppointmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [reminderSettings, setReminderSettings] = useState<ReminderSettingsType>({
    channels: ['email', 'sms'],
    schedule: [
      { type: 'days', value: 1, sent: false },
      { type: 'hours', value: 2, sent: false },
    ],
  });
  
  // If editing, we would fetch the appointment data here
  // For now, use placeholder data
  const defaultValues: AppointmentFormData = {
    title: isEditMode ? 'Follow-up Consultation' : '',
    patientId: isEditMode ? 'patient1' : '',
    doctorId: user?.role === 'doctor' ? user.id : '',
    date: isEditMode ? '2023-05-30' : '',
    time: isEditMode ? '09:00' : '',
    duration: isEditMode ? 30 : 30,
    type: isEditMode ? 'follow-up' : 'initial',
    location: isEditMode ? 'Room 105' : '',
    notes: isEditMode ? 'Review progress after medication change.' : '',
  };
  
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<AppointmentFormData>({
    defaultValues,
  });
  
  const onSubmit = async (data: AppointmentFormData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally save to your backend
      console.log('Appointment data:', {
        ...data,
        reminderSettings,
      });
      
      showNotification(
        isEditMode ? 'Appointment updated successfully' : 'Appointment created successfully',
        'success'
      );
      
      // Navigate back to the dashboard
      navigate(`/${user?.role}`);
    } catch (error) {
      showNotification('Failed to save appointment', 'error');
    }
  };
  
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              {isEditMode ? 'Edit Appointment' : 'New Appointment'}
            </h1>
            <p className="text-neutral-500">
              {isEditMode ? 'Update appointment details' : 'Schedule a new appointment'}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Calendar size={18} className="mr-2 text-primary-500" />
                Appointment Details
              </h2>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Input
                id="title"
                label="Appointment Title"
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="date"
                  label="Date"
                  type="date"
                  icon={<Calendar size={18} className="text-neutral-500" />}
                  error={errors.date?.message}
                  {...register('date', { required: 'Date is required' })}
                />
                
                <Input
                  id="time"
                  label="Time"
                  type="time"
                  icon={<Clock size={18} className="text-neutral-500" />}
                  error={errors.time?.message}
                  {...register('time', { required: 'Time is required' })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="duration"
                  control={control}
                  rules={{ required: 'Duration is required' }}
                  render={({ field }) => (
                    <Select
                      id="duration"
                      label="Duration (minutes)"
                      options={[
                        { value: '15', label: '15 minutes' },
                        { value: '30', label: '30 minutes' },
                        { value: '45', label: '45 minutes' },
                        { value: '60', label: '60 minutes' },
                        { value: '90', label: '90 minutes' },
                      ]}
                      value={field.value.toString()}
                      onChange={(value) => field.onChange(parseInt(value))}
                      error={errors.duration?.message}
                    />
                  )}
                />
                
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Appointment type is required' }}
                  render={({ field }) => (
                    <Select
                      id="type"
                      label="Appointment Type"
                      options={[
                        { value: 'initial', label: 'Initial Visit' },
                        { value: 'follow-up', label: 'Follow-up' },
                        { value: 'check-up', label: 'Check-up' },
                        { value: 'emergency', label: 'Emergency' },
                        { value: 'procedure', label: 'Procedure' },
                      ]}
                      value={field.value}
                      onChange={(value) => field.onChange(value as AppointmentType)}
                      error={errors.type?.message}
                    />
                  )}
                />
              </div>
              
              <Input
                id="location"
                label="Location"
                icon={<MapPin size={18} className="text-neutral-500" />}
                error={errors.location?.message}
                {...register('location')}
              />
              
              {user?.role === 'doctor' && (
                <Input
                  id="patientId"
                  label="Patient ID"
                  icon={<User size={18} className="text-neutral-500" />}
                  error={errors.patientId?.message}
                  {...register('patientId', { required: 'Patient ID is required' })}
                />
              )}
              
              {user?.role === 'patient' && (
                <Input
                  id="doctorId"
                  label="Doctor ID"
                  icon={<User size={18} className="text-neutral-500" />}
                  error={errors.doctorId?.message}
                  {...register('doctorId', { required: 'Doctor ID is required' })}
                />
              )}
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
                  Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    rows={4}
                    className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
                    placeholder="Add any additional notes or instructions..."
                    {...register('notes')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-heading font-semibold text-neutral-900 flex items-center">
                <Bell size={18} className="mr-2 text-primary-500" />
                Reminder Settings
              </h2>
            </CardHeader>
            
            <CardContent>
              <ReminderSettings 
                settings={reminderSettings}
                onChange={setReminderSettings}
              />
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/${user?.role}`)}
              icon={<X size={18} />}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              icon={<Save size={18} />}
            >
              {isEditMode ? 'Update Appointment' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
};

export default AppointmentForm;