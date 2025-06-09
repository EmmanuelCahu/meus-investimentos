import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Coluna esquerda */}
      <div className="flex-1 flex items-center justify-center border-r border-gray-300">
        <img src="/main.png" alt="Main" className="max-w-full max-h-80 object-contain" />
      </div>

      {/* Coluna do meio */}
      <div className="flex-1 flex items-center justify-center border-r border-gray-300">
        <img src="/main.png" alt="Main" className="max-w-full max-h-80 object-contain" />
      </div>

      {/* Coluna direita - formulário sem borda */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seuemail@exemplo.com"
          />

          <label className="block mb-2 font-semibold">Senha</label>
          <input
            type="password"
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sua senha"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
