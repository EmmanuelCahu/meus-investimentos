import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const HomePage: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup' | 'forgot'>('login');

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100" />
      <div className="w-1/3 flex items-center justify-center">
        <img src="/Main.png" alt="Main" className="max-h-2/3" />
      </div>
      <div className="w-1/3 flex flex-col items-center justify-center">
        <img src="/logo-meus-investimentos.png" alt="Logo" className="mb-4 w-32" />
        {formType === 'login' && <LoginForm setFormType={setFormType} />}
        {formType === 'signup' && <SignUpForm setFormType={setFormType} />}
        {formType === 'forgot' && <ForgotPasswordForm setFormType={setFormType} />}
      </div>
    </div>
  );
};

export default HomePage;
