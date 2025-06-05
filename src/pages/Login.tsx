import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/ativos");
    } catch (err: any) {
      setErro("Email ou senha inválidos. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Imagem lado esquerdo */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 p-6">
        <img src="/Main.png" alt="Imagem" className="max-w-[90%] max-h-[90%]" />
      </div>

      {/* Formulário lado direito */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo no topo (mobile ou desktop) */}
          <div className="flex justify-center mb-4">
            <motion.img
              src="/logo-meus-investimentos.png"
              alt="Meus Investimentos"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-40"
            />
          </div>

          <h2 className="text-center text-xl font-semibold text-gray-700">Entrar na sua conta</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Entrar
            </button>

            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <Link to="/forgot-password" className="hover:underline">Esqueci a senha</Link>
              <Link to="/signup" className="hover:underline">Criar conta</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
