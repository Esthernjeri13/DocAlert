import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <div className="bg-error-100 p-3 rounded-full inline-flex mb-4 animate-pulse">
          <AlertOctagon size={36} className="text-error-500" />
        </div>
        
        <h1 className="text-6xl font-heading font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-neutral-800 mb-2">Page Not Found</h2>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button variant="primary" icon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;