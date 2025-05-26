import React, { createContext, useContext, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface NotificationContextType {
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #dcfce7',
          },
        });
        break;
      case 'error':
        toast.error(message, {
          style: {
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fee2e2',
          },
        });
        break;
      case 'warning':
        toast(message, {
          icon: '⚠️',
          style: {
            background: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fef3c7',
          },
        });
        break;
      case 'info':
      default:
        toast(message, {
          icon: 'ℹ️',
          style: {
            background: '#eff6ff',
            color: '#1e40af',
            border: '1px solid #dbeafe',
          },
        });
        break;
    }
  }, []);
  
  const clearNotifications = useCallback(() => {
    toast.dismiss();
  }, []);
  
  return (
    <NotificationContext.Provider value={{ showNotification, clearNotifications }}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 5000,
          style: {
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};