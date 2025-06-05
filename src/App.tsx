// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Ativos from "./pages/Ativos";
import Recomendacoes from "./pages/Recomendacoes";
import Mercado from "./pages/Mercado";
import Educacao from "./pages/Educacao";
import Dashboard from "./pages/Dashboard";

import AuthContainer from "./pages/AuthContainer";

import Navbar from "./components/Navbar";
import { useAuth, AuthProvider } from "./components/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

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

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthContainer />} />

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

        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
