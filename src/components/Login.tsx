// src/pages/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, informe seu email para resetar a senha");
      return;
    }
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de reset");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex flex-1 bg-cover bg-center" style={{ backgroundImage: 'url(/images/investment.jpg)' }}></div>

      {/* Right side form */}
      <div className="flex flex-col justify-center flex-1 px-8 md:px-16">
        <h1 className="text-3xl font-bold mb-8">Meus Investimentos</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md w-full">
          {error && <p className="text-red-600">{error}</p>}
          {resetSent && <p className="text-green-600">Email para resetar a senha enviado!</p>}

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white p-3 rounded disabled:opacity-50"
          >
            {loading ? <LoadingSpinner /> : "Login"}
          </button>

          <div className="flex justify-between items-center text-sm">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-blue-500 hover:underline"
            >
              Esqueci minha senha
            </button>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Não tem conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
