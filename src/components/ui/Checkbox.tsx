import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || props.name || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            "h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="select-none text-sm text-gray-700"
          >
            {label}
          </label>
        )}
        {error && (
          <p
            id={`${checkboxId}-error`}
            role="alert"
            className="ml-8 text-xs text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
