// src/components/ui/Select.tsx

import React from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: Option[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  error,
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
    <select
      id={id}
      {...rest}
      className={`w-full border rounded-lg py-2 px-3 text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className || ''}`}
    >
      {options.map((opcao) => (
        <option
          key={opcao.value}
          value={opcao.value}
          disabled={opcao.disabled}
        >
          {opcao.label}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-red-600 text-sm">
        {error}
      </p>
    )}
  </div>
);

export default Select;
