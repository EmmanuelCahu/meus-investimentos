import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface Props {
  onSwitch: (type: 'signup' | 'forgot') => void;
}

export default function LoginForm({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function getErrorMessage(code: string) {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Verifique o e-mail.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Tente novamente.';
      case 'auth/invalid-email':
        return 'O e-mail digitado não é válido.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas falhas. Tente novamente mais tarde.';
      default:
        return 'Erro ao tentar fazer login. Tente novamente.';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Como você está usando onAuthStateChanged no contexto, o redirecionamento deve acontecer automaticamente.
      // Caso não aconteça, você pode forçar aqui a navegação (se estiver usando useNavigate).
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
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Log In'}
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
