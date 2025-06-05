import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, senha);
      setSucesso("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => {
        navigate("/ativos");
      }, 2000);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f6fa] px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Criar Conta</h2>
        {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm mb-2">{sucesso}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
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
          <Input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando conta..." : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
