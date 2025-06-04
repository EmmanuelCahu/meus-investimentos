import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <label className="inline-flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" className="form-checkbox rounded text-blue-600" {...props} />
    <span>{label}</span>
  </label>
);

export default Checkbox;
