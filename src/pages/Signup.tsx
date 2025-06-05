import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/ativos");
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Criar Conta</h2>
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Signup;
