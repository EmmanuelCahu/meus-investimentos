import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Meus Investimentos</h1>
      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/ativos" className="hover:underline">Ativos</Link>
        <Link to="/recomendacoes" className="hover:underline">Recomendações</Link>
        <Link to="/mercado" className="hover:underline">Mercado</Link>
        <Link to="/educacao" className="hover:underline">Educação</Link>
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 border rounded hover:bg-red-500 hover:text-white transition"
        >
          Sair
        </button>
      </nav>
    </header>
  );
}
