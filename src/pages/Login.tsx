// src/pages/Login.tsx
---
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-green-100 hidden lg:flex items-center justify-center">
        <img
          src="/logo-meus-investimentos.png"
          alt="Logo"
          className="w-32 h-auto"
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center mb-4">Entrar</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
