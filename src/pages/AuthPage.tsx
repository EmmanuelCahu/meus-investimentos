import React, { useState } from 'react';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

type View = 'login' | 'signup' | 'forgot';

const AuthPage: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter ao menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Conta criada com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!email) {
      setError('Por favor, insira seu email.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Email de recuperação enviado com sucesso.');
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar email de recuperação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Lado esquerdo com imagem */}
      <div className="hidden md:flex w-1/2 bg-yellow-500 items-center justify-center">
        <img src="/login-image.svg" alt="Investimentos" className="w-3/4 h-auto" />
      </div>

      {/* Lado direito com formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {view === 'login' && 'Acesse sua conta'}
            {view === 'signup' && 'Criar nova conta'}
            {view === 'forgot' && 'Recuperar senha'}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>
          )}

          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    resetMessages();
                    setView('forgot');
                  }}
                >
                  Esqueci minha senha
                </button>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    resetMessages();
                    setView('signup');
                  }}
                >
                  Criar conta
                </button>
              </div>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    resetMessages();
                    setView('login');
                  }}
                >
                  Já tem conta? Entrar
                </button>
              </div>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
              >
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    resetMessages();
                    setView('login');
                  }}
                >
                  Voltar para login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
