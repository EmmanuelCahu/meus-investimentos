import React from 'react';

interface Props {
  onSwitch: (type: 'signup' | 'forgot') => void;
}

export default function LoginForm({ onSwitch }: Props) {
  return (
    <form className="w-full max-w-sm space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Log In
      </button>
      <div className="flex justify-between text-sm">
        <button type="button" className="text-blue-600 hover:underline" onClick={() => onSwitch('forgot')}>
          Forgot your Password?
        </button>
        <button type="button" className="text-blue-600 hover:underline" onClick={() => onSwitch('signup')}>
          Sign up
        </button>
      </div>
    </form>
  );
}
