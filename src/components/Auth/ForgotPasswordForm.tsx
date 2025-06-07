import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  const validate = () => {
    if (!email) {
      setError("Email é obrigatório");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email inválido");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        id="forgot-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        autoComplete="email"
        required
        disabled={isLoading}
      />
      <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
        Enviar Instruções
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
