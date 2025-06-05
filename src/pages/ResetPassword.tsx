import React from "react";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f6fa] px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifique seu email</h2>
        <p className="text-gray-600 mb-6">
          Um link para redefinir sua senha foi enviado para o seu email. Siga as instruções do link.
        </p>

        <Link
          to="/login"
          className="text-blue-600 hover:underline text-sm"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
