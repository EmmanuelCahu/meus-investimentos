// src/pages/Signup.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? <LoadingSpinner /> : "Cadastrar"}
        </button>
      </form>
      <div className="mt-4 text-sm">
        Já tem conta?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default Signup;
