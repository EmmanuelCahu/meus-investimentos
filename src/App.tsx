import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage'; // corrigido para default import
import Dashboard from './pages/Dashboard';
import Ativos from './pages/Ativos';
import Recomendacoes from './pages/Recomendacoes';
import Mercado from './pages/Mercado';
import Educacao from './pages/Educacao';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/ativos"
            element={<ProtectedRoute><Ativos /></ProtectedRoute>}
          />
          <Route
            path="/recomendacoes"
            element={<ProtectedRoute><Recomendacoes /></ProtectedRoute>}
          />
          <Route
            path="/mercado"
            element={<ProtectedRoute><Mercado /></ProtectedRoute>}
          />
          <Route
            path="/educacao"
            element={<ProtectedRoute><Educacao /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
