import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/config';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Página inicial pública */}
        <Route path="/" element={<Home />} />

        {/* Rota pública para autenticação */}
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />}
        />

        {/* Rota protegida para dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" replace />}
        />

        {/* Catch-all: redireciona para root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
