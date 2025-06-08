import React from 'react';

const SignUpForm: React.FC<{ setFormType: (type: 'login' | 'signup' | 'forgot') => void }> = ({ setFormType }) => {
  return (
    <form className="w-full max-w-xs">
      <input className="w-full mb-2 p-2 border" type="email" placeholder="Email" />
      <input className="w-full mb-2 p-2 border" type="password" placeholder="Senha" />
      <button className="w-full p-2 bg-green-600 text-white mb-2">Sign Up</button>
      <div className="text-sm text-center">
        <button type="button" onClick={() => setFormType('login')}>Já tem conta? Login</button>
      </div>
    </form>
  );
};

export default SignUpForm;