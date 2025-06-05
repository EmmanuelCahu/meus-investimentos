import React, { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Senha redefinida com sucesso! Redirecionando para login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow text-center">
        <p className="text-red-600">Código inválido ou ausente.</p>
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Solicitar novo link
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Redefinir senha</h1>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir senha"}
        </Button>
        <Link to="/login" className="text-blue-500 hover:underline text-sm text-center">
          Voltar para login
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
