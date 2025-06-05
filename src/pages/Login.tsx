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
      {/* Esquerda - Imagem */}
      <div className="hidden md:flex md:w-1/3 items-center justify-center p-4">
        <img
          src="/Main.png"
          alt="Imagem ilustrativa"
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>

      {/* Centro - Logo com animação */}
      <div className="hidden md:flex md:w-1/3 items-center justify-center p-4">
        <motion.img
          src="/logo-meus-investimentos.png"
          alt="Meus Investimentos"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[175px] h-[51px]"
        />
      </div>

      {/* Direita - Formulário */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 md:w-1/3">
        <div className="w-full max-w-sm space-y-4">
          {/* Mobile: mostra logo no topo */}
          <div className="flex justify-center mb-4 md:hidden">
            <motion.img
              src="/logo-meus-investimentos.png"
              alt="Meus Investimentos"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-[150px] h-auto"
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            >
              Login
            </button>

            <div className="flex justify-between text-sm mt-2">
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
