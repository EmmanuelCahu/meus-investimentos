import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Meus Investimentos</h1>
        <p className="text-lg text-gray-700 mb-6">
          Organize e acompanhe seus investimentos com inteligência. Crie sua carteira, receba recomendações e tome decisões baseadas em dados.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Acessar minha conta
        </button>
      </div>
    </div>
  );
};

export default Home;
