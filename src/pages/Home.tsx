import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-100 to-white">
      {/* Imagem do lado esquerdo */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
        <motion.img
          src="/Main.png"
          alt="Investimentos"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-h-[80%] object-contain"
        />
      </div>

      {/* Conteúdo central */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 py-12 text-center">
        <motion.img
          src="/logo-meus-investimentos.png"
          alt="Logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-48 mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Meus Investimentos
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Organize e acompanhe seus investimentos com inteligência. Crie sua carteira, receba recomendações e tome decisões baseadas em dados.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm md:text-base hover:bg-blue-700 transition"
        >
          Acessar minha conta
        </Link>
      </div>
    </div>
  );
};

export default Home;
