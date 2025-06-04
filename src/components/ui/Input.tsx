// src/components/ui/Input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  icon,
  className,
  ...rest
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={id}
      className="mb-1 font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        {...rest}
        className={`w-full border rounded-lg py-2 px-3 text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          icon ? 'pl-10' : ''
        } ${error ? 'border-red-500' : 'border-gray-300'} ${
          className || ''
        }`}
      />
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-red-600 text-sm">
        {error}
      </p>
    )}
  </div>
);

export default Input;
