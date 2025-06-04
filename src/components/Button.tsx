// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const baseStyles = "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium focus:outline-none transition-colors";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(baseStyles, variants[variant], "focus:ring-2", className)}
    {...props}
  />
));
Button.displayName = "Button";

export default Button;
