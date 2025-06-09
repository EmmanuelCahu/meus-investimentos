import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSwitch: () => void;
}

export default function SignUpForm({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getErrorMessage(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este email já está em uso.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/weak-password':
        return 'Senha fraca. Use pelo menos 6 caracteres.';
      default:
        return 'Erro ao criar conta. Tente novamente.';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Usuário criado e autenticado automaticamente
      navigate('/dashboard');
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      {error && <p className="text-red-600 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
        minLength={6}
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
        required
        minLength={6}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? 'Criando...' : 'Criar Conta'}
      </button>
      <div className="text-sm text-center">
        <button type="button" className="text-blue-600 hover:underline" onClick={onSwitch}>
          Voltar para login
        </button>
      </div>
    </form>
  );
}
