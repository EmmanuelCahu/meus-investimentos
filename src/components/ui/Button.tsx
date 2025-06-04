import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading = false, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseStyles, variants[variant], "focus:ring-2", className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
