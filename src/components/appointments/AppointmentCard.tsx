import React from 'react';
import { Calendar, Clock, User, MapPin, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Appointment } from '../../types';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'admin' | 'doctor' | 'patient';
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, userRole }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="primary">Scheduled</Badge>;
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'no-show':
        return <Badge variant="warning">No Show</Badge>;
    }
  };
  
  const getAppointmentTypeBadge = (type: Appointment['type']) => {
    switch (type) {
      case 'initial':
        return <Badge variant="primary">Initial Visit</Badge>;
      case 'follow-up':
        return <Badge variant="secondary">Follow-up</Badge>;
      case 'check-up':
        return <Badge variant="success">Check-up</Badge>;
      case 'emergency':
        return <Badge variant="error">Emergency</Badge>;
      case 'procedure':
        return <Badge variant="warning">Procedure</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  const viewDetails = () => {
    navigate(`/${userRole}/appointment/${appointment.id}`);
  };
  
  return (
    <Card className="animate-fade-in hover:shadow-card-hover transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-heading font-medium text-neutral-900">{appointment.title}</h3>
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(appointment.status)}
                {getAppointmentTypeBadge(appointment.type)}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-neutral-700">
                <Calendar size={16} className="mr-2 text-primary-500" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              
              <div className="flex items-center text-sm text-neutral-700">
                <Clock size={16} className="mr-2 text-primary-500" />
                <span>{appointment.time} ({appointment.duration} minutes)</span>
              </div>
              
              {appointment.location && (
                <div className="flex items-center text-sm text-neutral-700">
                  <MapPin size={16} className="mr-2 text-primary-500" />
                  <span>{appointment.location}</span>
                </div>
              )}
              
              {userRole === 'doctor' && (
                <div className="flex items-center text-sm text-neutral-700">
                  <User size={16} className="mr-2 text-primary-500" />
                  <span>Patient ID: {appointment.patientId}</span>
                </div>
              )}
              
              {userRole === 'patient' && (
                <div className="flex items-center text-sm text-neutral-700">
                  <User size={16} className="mr-2 text-primary-500" />
                  <span>Doctor ID: {appointment.doctorId}</span>
                </div>
              )}
            </div>
            
            {appointment.notes && (
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="flex items-start">
                  <FileText size={16} className="mr-2 mt-0.5 flex-shrink-0 text-primary-500" />
                  <p className="text-sm text-neutral-600">{appointment.notes}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 bg-neutral-50 flex justify-between items-center">
            <div className="flex items-center text-xs text-neutral-500">
              <span>
                Reminders: {appointment.reminderSettings.channels.join(', ')}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={viewDetails}
              >
                View Details
              </Button>
              
              {userRole === 'patient' && appointment.status === 'scheduled' && (
                <>
                  <Button 
                    size="sm" 
                    variant="success" 
                    icon={<CheckCircle size={14} />}
                  >
                    Confirm
                  </Button>
                  <Button 
                    size="sm" 
                    variant="warning" 
                    icon={<AlertCircle size={14} />}
                  >
                    Reschedule
                  </Button>
                </>
              )}
              
              {userRole === 'doctor' && appointment.status === 'scheduled' && (
                <Button 
                  size="sm" 
                  variant="error" 
                  icon={<XCircle size={14} />}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;