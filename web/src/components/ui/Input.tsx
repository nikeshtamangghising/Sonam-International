'use client';

import React, { forwardRef } from 'react';

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      onChange,
      name,
      id,
      className = '',
      label,
      error,
      required = false,
      disabled = false,
      fullWidth = false,
    },
    ref
  ) => {
    // Base classes
    const baseClasses = 'px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors';
    
    // Error classes
    const errorClasses = error ? 'border-red-500' : 'border-gray-300';
    
    // Disabled classes
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
    
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    
    // Combine all classes
    const inputClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${widthClasses} ${className}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={id || name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          id={id || name}
          className={inputClasses}
          required={required}
          disabled={disabled}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
