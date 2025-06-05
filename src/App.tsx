import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Ativos from "./pages/Ativos";
import Recomendacoes from "./pages/Recomendacoes";
import Mercado from "./pages/Mercado";
import Educacao from "./pages/Educacao";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";
import { useAuthStatus } from "./hooks/useAuthStatus";

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
        {!user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/ativos" element={<Ativos />} />
            <Route path="/recomendacoes" element={<Recomendacoes />} />
            <Route path="/mercado" element={<Mercado />} />
            <Route path="/educacao" element={<Educacao />} />
            <Route path="*" element={<Ativos />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
