import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Ativos from "./pages/Ativos";
import Recomendacoes from "./pages/Recomendacoes";
import Mercado from "./pages/Mercado";
import Educacao from "./pages/Educacao";
import Dashboard from "./pages/Dashboard";

import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";
import { useAuthStatus } from "./hooks/useAuthStatus";

// Componente para proteger rotas privadas
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App: React.FC = () => {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rotas privadas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ativos"
          element={
            <ProtectedRoute>
              <Ativos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recomendacoes"
          element={
            <ProtectedRoute>
              <Recomendacoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mercado"
          element={
            <ProtectedRoute>
              <Mercado />
            </ProtectedRoute>
          }
        />
        <Route
          path="/educacao"
          element={
            <ProtectedRoute>
              <Educacao />
            </ProtectedRoute>
          }
        />

        {/* Redirecionamento geral */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
