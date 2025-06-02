import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-indigo-600">Meus Investimentos</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ativos"
              className={({ isActive }) =>
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Ativos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mercado"
              className={({ isActive }) =>
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Mercado
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recomendacoes"
              className={({ isActive }) =>
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Recomendações
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/educacao"
              className={({ isActive }) =>
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Educação
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
