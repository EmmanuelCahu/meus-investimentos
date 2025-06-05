import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/ativos");
    } catch (err: any) {
      setErro(err.message || "Erro ao criar conta.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        <Button type="submit" className="w-full">Cadastrar</Button>
        <p className="text-sm text-center">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
