import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Se usuário logado, vai para dashboard, senão para auth
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/auth', { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null; // Apenas redireciona
};

export default IndexPage;
