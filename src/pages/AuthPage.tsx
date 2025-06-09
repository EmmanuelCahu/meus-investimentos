import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

export function AuthPage() {
  const [formType, setFormType] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [params] = useSearchParams();

  // Detecta resetPassword com oobCode
  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');
    if (mode === 'resetPassword' && oobCode) {
      setFormType('reset');
    }
  }, [params]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-gray-50 to-white">
      {/* Imagem central (reduzida em 20%) */}
      <div className="md:col-span-2 flex items-center justify-center p-4">
        <img
          src="/Main.png"
          alt="Imagem principal"
          className="max-h-[65vh] w-auto object-contain transition-all duration-300"
        />
      </div>

      {/* Formulário dinâmico */}
      <div className="p-8 flex flex-col justify-center items-center bg-white shadow-lg">
        <img
          src="/logo-meus-investimentos.png"
          alt="Logo"
          className="w-32 mb-6 object-contain"
        />
        {formType === 'login' && <LoginForm onSwitch={(type) => setFormType(type)} />}
        {formType === 'signup' && <SignUpForm onSwitch={() => setFormType('login')} />}
        {formType === 'forgot' && <ForgotPasswordForm onSwitch={() => setFormType('login')} />}
        {formType === 'reset' && <ResetPasswordForm onSwitch={() => setFormType('login')} />}
      </div>
    </div>
  );
}
