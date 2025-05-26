// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'doctor' | 'patient';

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  date: string; // ISO string
  time: string; // HH:MM format
  duration: number; // in minutes
  status: AppointmentStatus;
  notes?: string;
  type: AppointmentType;
  location?: string;
  reminderSettings: ReminderSettings;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
export type AppointmentType = 'initial' | 'follow-up' | 'check-up' | 'emergency' | 'procedure';

// Reminder types
export interface ReminderSettings {
  channels: ReminderChannel[];
  schedule: ReminderSchedule[];
}

export type ReminderChannel = 'sms' | 'whatsapp' | 'email' | 'push';

export interface ReminderSchedule {
  type: 'days' | 'hours' | 'minutes';
  value: number;
  sent?: boolean;
  sentAt?: string;
}

export interface Reminder {
  id: string;
  appointmentId: string;
  patientId: string;
  channel: ReminderChannel;
  message: string;
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

// Patient types
export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  medicalRecordNumber?: string;
  emergencyContact?: string;
  preferredReminderChannels: ReminderChannel[];
}

// Doctor types
export interface Doctor extends User {
  role: 'doctor';
  specialization?: string;
  department?: string;
  licenseNumber?: string;
  availableHours?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

// Analytics types
export interface AnalyticsData {
  totalAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  reminderStats: {
    sent: number;
    delivered: number;
    failed: number;
    byChannel: {
      channel: ReminderChannel;
      count: number;
    }[];
  };
  appointmentsByDay: {
    date: string;
    count: number;
  }[];
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}