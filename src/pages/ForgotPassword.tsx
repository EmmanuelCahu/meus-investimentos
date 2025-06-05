import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setMensagem("");

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMensagem("Email de redefinição enviado com sucesso!");
    } catch (err: any) {
      setErro("Erro ao enviar o email. Verifique o endereço digitado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f6fa] px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Redefinir Senha</h2>
        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}
        {mensagem && <p className="text-green-600 text-sm mb-2">{mensagem}</p>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link de redefinição"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
