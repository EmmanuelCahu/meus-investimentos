import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="flex h-screen bg-white">
      {/* Lado esquerdo com imagem centralizada */}
      <div className="hidden md:flex w-1/3 items-center justify-center p-4">
        <img
          src="/Main.png"
          alt="Imagem ilustrativa"
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>

      {/* Espaço central com o logo */}
      <div className="hidden md:flex w-1/3 items-center justify-center p-4">
        <img
          src="/logo-meus-investimentos.png"
          alt="Meus Investimentos"
          className="w-[175px] h-[51px]"
        />
      </div>

      {/* Formulário de login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {/* Campos de login menores */}
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

          {/* Botão com nome "Login" */}
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
  );
};

export default Login;
