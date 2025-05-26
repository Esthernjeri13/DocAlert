import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, User, MapPin, FileText } from 'lucide-react';

const AppointmentDetails = () => {
  const { id } = useParams();

  // This is a placeholder component that will be connected to real data later
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointment Details</h1>
        
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                Upcoming
              </Badge>
              <span className="text-gray-500">ID: {id}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Date: December 15, 2025</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Time: 2:30 PM</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-blue-600" />
                <span>Doctor: Dr. Sarah Johnson</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Location: Main Clinic, Room 204</span>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-3 text-gray-700 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Notes</span>
                </div>
                <p className="text-gray-600 ml-8">
                  Regular check-up appointment. Please arrive 15 minutes early to complete any necessary paperwork.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentDetails;