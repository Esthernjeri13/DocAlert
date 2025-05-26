import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, fullWidth = true, icon, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            id={id}
            ref={ref}
            className={`
              ${icon ? 'pl-10' : 'pl-4'}
              block px-4 py-2 bg-white border border-neutral-300 rounded-md shadow-sm 
              placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed
              ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}
              ${widthClass}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-error-500" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;