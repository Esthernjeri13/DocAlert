import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      showNotification('Successfully logged in!', 'success');
      
      // Navigate based on role
      if (data.email === 'admin@example.com') {
        navigate('/admin');
      } else if (data.email === 'doctor@example.com') {
        navigate('/doctor');
      } else if (data.email === 'patient@example.com') {
        navigate('/patient');
      }
    } catch (err) {
      // Error is already handled in auth context
    }
  };
  
  const loginAsDemo = async (role: 'admin' | 'doctor' | 'patient') => {
    try {
      let email = '';
      switch (role) {
        case 'admin':
          email = 'admin@example.com';
          break;
        case 'doctor':
          email = 'doctor@example.com';
          break;
        case 'patient':
          email = 'patient@example.com';
          break;
      }
      
      await login(email, 'password');
      showNotification(`Logged in as ${role}!`, 'success');
      navigate(`/${role}`);
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
          DocAlert
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Sign in to your account
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              icon={<LogIn size={18} />}
            >
              Sign in
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Or</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setShowDemoOptions(!showDemoOptions)}
              >
                Demo Options
              </Button>
              
              {showDemoOptions && (
                <div className="mt-3 space-y-2">
                  <Button
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => loginAsDemo('admin')}
                  >
                    Login as Admin
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => loginAsDemo('doctor')}
                  >
                    Login as Doctor
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => loginAsDemo('patient')}
                  >
                    Login as Patient
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;