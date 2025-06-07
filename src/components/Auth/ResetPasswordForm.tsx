import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ResetPasswordFormProps {
  onSubmit: (data: { password: string; confirmPassword: string }) => Promise<void>;
  isLoading: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!password) newErrors.password = "Senha é obrigatória";
    if (!confirmPassword) newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        id="reset-password"
        label="Nova Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
        required
        disabled={isLoading}
      />
      <Input
        id="reset-confirm-password"
        label="Confirmar Nova Senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        required
        disabled={isLoading}
        className="mt-4"
      />
      <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
        Alterar Senha
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
