import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Bem-vindo ao Meus Investimentos
      </h1>
      <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
        Sua plataforma para gerenciar investimentos, analisar ativos e construir sua carteira ideal.
      </p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition"
        onClick={() => navigate("/")}
      >
        Entrar ou Cadastrar
      </button>
    </div>
  );
};

export default Home;
