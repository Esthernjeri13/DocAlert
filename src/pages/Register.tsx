import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { UserRole } from '../types';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const { register: registerUser, isLoading, error } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.role);
      showNotification('Account created successfully!', 'success');
      navigate(`/${data.role}`);
    } catch (err) {
      // Error is already handled in auth context
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">D</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-heading font-bold text-neutral-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Join DocAlert reminder system
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded bg-error-50 border border-error-200 text-error-700 flex items-start">
              <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="name"
              label="Full name"
              icon={<User size={18} className="text-neutral-500" />}
              error={errors.name?.message}
              {...register('name', { 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            
            <Input
              id="email"
              label="Email address"
              type="email"
              icon={<Mail size={18} className="text-neutral-500" />}
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            
            <Input
              id="password"
              label="Password"
              type="password"
              icon={<Lock size={18} className="text-neutral-500" />}
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            
            <Input
              id="confirmPassword"
              label="Confirm password"
              type="password"
              icon={<Lock size={18} className="text-neutral-500" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
            
            <Select
              id="role"
              label="Account type"
              options={[
                { value: 'patient', label: 'Patient' },
                { value: 'doctor', label: 'Doctor' },
              ]}
              error={errors.role?.message}
              {...register('role', { required: 'Please select an account type' })}
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              icon={<UserPlus size={18} />}
            >
              Create account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;