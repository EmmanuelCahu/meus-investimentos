import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase"; // ajuste o caminho conforme seu projeto
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard"); // redireciona usuário logado para dashboard
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      {/* Lado esquerdo - imagem */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-blue-700">
        <img
          src="/images/investimentos-hero.png" // ajuste para sua imagem
          alt="Investimentos"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Lado direito - formulário login */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo ao Meus Investimentos</h1>
          <p className="mb-8 text-gray-600">
            Organize e acompanhe seus investimentos com inteligência. Crie sua carteira, receba recomendações e tome decisões baseadas em dados.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
