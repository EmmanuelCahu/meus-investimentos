import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface Props {
  onSwitch: () => void;
}

export default function ResetPasswordForm({ onSwitch }: Props) {
  const [params] = useSearchParams();
  const oobCode = params.get('oobCode') || '';
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Senha redefinida com sucesso! Faça login novamente.');
    } catch (err) {
      setError('Erro ao redefinir a senha. Link expirado ou inválido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-semibold text-center">Nova Senha</h2>
      {message && <p className="text-green-600 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <input
        type="password"
        placeholder="Digite a nova senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
        minLength={6}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Salvando...' : 'Redefinir Senha'}
      </button>
      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline"
        >
          Voltar para login
        </button>
      </div>
    </form>
  );
}
