import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('mode') === 'resetPassword') {
      setView('reset');
    }
  }, [searchParams]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/dashboard');
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {view === 'login' && <LoginForm onSwitch={setView} />}
        {view === 'signup' && <SignUpForm onSwitch={setView} />}
        {view === 'forgot' && <ForgotPasswordForm onSwitch={setView} />}
        {view === 'reset' && <ResetPasswordForm onSwitch={setView} />}
      </div>
    </div>
  );
}
