import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem("Email de recuperação enviado com sucesso!");
    } catch (err: any) {
      setErro(err.message || "Erro ao enviar o email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Recuperar Senha</h2>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {mensagem && <p className="text-green-600 text-sm">{mensagem}</p>}
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        <Button type="submit" className="w-full">
          Enviar link de recuperação
        </Button>
        <Link to="/login" className="text-blue-600 text-sm block text-center">
          Voltar para o login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
