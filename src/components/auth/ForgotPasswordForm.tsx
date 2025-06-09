import React from 'react';

interface Props {
  onSwitch: () => void;
}

export default function ForgotPasswordForm({ onSwitch }: Props) {
  return (
    <form className="w-full max-w-sm space-y-4">
      <input
        type="email"
        placeholder="Email cadastrado"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
      >
        Recuperar Senha
      </button>
      <div className="text-sm text-center">
        <button type="button" className="text-blue-600 hover:underline" onClick={onSwitch}>
          Voltar para login
        </button>
      </div>
    </form>
  );
}
