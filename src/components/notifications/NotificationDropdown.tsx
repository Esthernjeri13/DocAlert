import React from 'react';
import { Bell, X, Check } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationDropdownProps {
  onClose: () => void;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Appointment Confirmed',
    message: 'Patient John Doe confirmed their appointment for 3:00 PM today',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Appointment Cancelled',
    message: 'Patient Emma Wilson cancelled their appointment for tomorrow',
    type: 'error',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
];

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  // Format relative time
  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  // Notification type styles
  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-l-success-500';
      case 'warning':
        return 'bg-warning-50 border-l-warning-500';
      case 'error':
        return 'bg-error-50 border-l-error-500';
      default:
        return 'bg-primary-50 border-l-primary-500';
    }
  };
  
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-200">
        <div className="flex items-center">
          <Bell size={16} className="text-primary-500 mr-2" />
          <h3 className="text-sm font-medium text-neutral-900">Notifications</h3>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
            {mockNotifications.length}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.length > 0 ? (
          <div>
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  p-4 border-b border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer
                  border-l-4 ${getNotificationStyles(notification.type)}
                `}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-neutral-900">{notification.title}</h4>
                  <span className="text-xs text-neutral-500">{formatRelativeTime(notification.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{notification.message}</p>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-primary-600 hover:text-primary-800 mr-3">
                    <Check size={14} className="inline mr-1" />
                    Mark as read
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-neutral-500 text-sm">
            No notifications
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-neutral-200 bg-neutral-50">
        <button className="w-full text-xs text-center text-primary-600 hover:text-primary-800 py-1">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;