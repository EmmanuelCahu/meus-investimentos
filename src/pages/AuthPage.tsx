import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export function AuthPage() {
  const [formType, setFormType] = useState<'login' | 'signup' | 'forgot'>('login');

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-gray-50 to-white">
      {/* Imagem no centro */}
      <div className="md:col-span-2 flex items-center justify-center p-4">
        <img
          src="/Main.png"
          alt="Imagem principal"
          className="max-h-[80vh] w-auto object-contain"
        />
      </div>

      {/* Formulário à direita */}
      <div className="p-8 flex flex-col justify-center items-center bg-white shadow-lg">
        <img
          src="/logo-meus-investimentos.png"
          alt="Logo"
          className="w-36 mb-6 object-contain"
        />
        {formType === 'login' && (
          <LoginForm onSwitch={(type) => setFormType(type)} />
        )}
        {formType === 'signup' && (
          <SignUpForm onSwitch={() => setFormType('login')} />
        )}
        {formType === 'forgot' && (
          <ForgotPasswordForm onSwitch={() => setFormType('login')} />
        )}
      </div>
    </div>
  );
}
