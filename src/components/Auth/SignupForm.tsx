import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SignupFormProps {
  onSubmit: (data: { email: string; password: string; confirmPassword: string }) => Promise<void>;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  function validate() {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!password) newErrors.password = "Senha é obrigatória";
    if (!confirmPassword) newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    if (password && confirmPassword && password !== confirmPassword) newErrors.confirmPassword = "Senhas não coincidem";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ email, password, confirmPassword });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        id="signup-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        disabled={isLoading}
      />
      <Input
        id="signup-password"
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
        disabled={isLoading}
        className="mt-4"
      />
      <Input
        id="signup-confirm-password"
        label="Confirmar Senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={isLoading}
        className="mt-4"
      />
      <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
        Cadastrar
      </Button>
    </form>
  );
};

export default SignupForm;
