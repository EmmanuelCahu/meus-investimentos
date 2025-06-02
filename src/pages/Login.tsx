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
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Meus Investimentos</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Entrar
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
