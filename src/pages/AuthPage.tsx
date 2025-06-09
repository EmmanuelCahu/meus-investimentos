// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

type View = 'login' | 'signup' | 'forgot';

export function AuthPage() {
  const [view, setView] = useState<View>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dados do formulário controlados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reseta mensagens
  const resetMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Handlers dos formulários
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sucesso: o onAuthStateChanged no contexto fará a navegação automática
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
      setSuccessMessage('Conta criada com sucesso! Você será redirecionado.');
      // O onAuthStateChanged irá atualizar o estado e navegar automaticamente
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

  // Renderiza os formulários com os dados e handlers controlados
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {view === 'login' && 'Login'}
          {view === 'signup' && 'Criar Conta'}
          {view === 'forgot' && 'Recuperar Senha'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>
        )}

        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Log In'}
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
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Criar Conta'}
            </button>
            <div className="text-sm text-center">
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

        {view === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Enviar email de recuperação'}
            </button>
            <div className="text-sm text-center">
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
  );
}
