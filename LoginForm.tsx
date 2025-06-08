import React from 'react';

const LoginForm: React.FC<{ setFormType: (type: 'login' | 'signup' | 'forgot') => void }> = ({ setFormType }) => {
  return (
    <form className="w-full max-w-xs">
      <input className="w-full mb-2 p-2 border" type="email" placeholder="Email" />
      <input className="w-full mb-2 p-2 border" type="password" placeholder="Senha" />
      <button className="w-full p-2 bg-blue-600 text-white mb-2">Log In</button>
      <div className="flex justify-between text-sm">
        <button type="button" onClick={() => setFormType('forgot')}>Forgot your Password?</button>
        <button type="button" onClick={() => setFormType('signup')}>Sign up</button>
      </div>
    </form>
  );
};

export default LoginForm;