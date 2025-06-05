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
      setErro(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Esquerda - Imagem maior e centralizada */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
        <img
          src="/Main.png"
          alt="Imagem ilustrativa"
          className="w-full max-w-[85%] h-auto object-contain"
        />
      </div>

      {/* Direita - Logo + Formulário */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-8 md:w-1/2 relative">
        {/* Logo acima do formulário */}
        <motion.img
          src="/logo-meus-investimentos.png"
          alt="Meus Investimentos"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[140px] h-auto mb-6 md:absolute md:top-12"
        />

        <div className="w-full max-w-xs space-y-4 mt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-1.5 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded px-3 py-1.5 text-sm"
              required
            />
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              Login
            </button>

            <div className="flex justify-between text-xs mt-2">
              <Link to="/forgot-password" className="text-blue-600">Esqueci a senha</Link>
              <Link to="/signup" className="text-blue-600">Criar conta</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
