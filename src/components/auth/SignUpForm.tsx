import React from 'react';

interface Props {
  onSwitch: () => void;
}

export default function SignUpForm({ onSwitch }: Props) {
  return (
    <form className="w-full max-w-sm space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Criar Conta
      </button>
      <div className="text-sm text-center">
        <button type="button" className="text-blue-600 hover:underline" onClick={onSwitch}>
          Voltar para login
        </button>
      </div>
    </form>
  );
}
