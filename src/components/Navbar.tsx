import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">Meus Investimentos</div>
      <div className="flex space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/ativos"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Ativos
        </NavLink>
        <NavLink
          to="/mercado"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Mercado
        </NavLink>
        <NavLink
          to="/recomendacoes"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Recomendações
        </NavLink>
        <NavLink
          to="/educacao"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Educação
        </NavLink>
        <button
          onClick={handleLogout}
          className="hover:underline text-red-200 font-medium"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
