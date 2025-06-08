import React from 'react';

const ForgotPasswordForm: React.FC<{ setFormType: (type: 'login' | 'signup' | 'forgot') => void }> = ({ setFormType }) => {
  return (
    <form className="w-full max-w-xs">
      <input className="w-full mb-2 p-2 border" type="email" placeholder="Digite seu email" />
      <button className="w-full p-2 bg-yellow-600 text-white mb-2">Recuperar Senha</button>
      <div className="text-sm text-center">
        <button type="button" onClick={() => setFormType('login')}>Voltar ao login</button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
