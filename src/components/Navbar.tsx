// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-600 text-white flex justify-end p-4 space-x-6">
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
    </nav>
  );
};

export default Navbar;
