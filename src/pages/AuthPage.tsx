// src/pages/AuthPage.tsx
import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

type View = 'login' | 'signup' | 'forgot';

interface State {
  view: View;
  loading: boolean;
  error: string | null;
  success: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  passwordVisible: boolean;
}

type Action =
  | { type: 'SET_VIEW'; view: View }
  | { type: 'SET_FIELD'; field: keyof State; value: string | boolean }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; message: string | null }
  | { type: 'SET_SUCCESS'; message: string | null }
  | { type: 'RESET_MESSAGES' };

const initialState: State = {
  view: 'login',
  loading: false,
  error: null,
  success: null,
  email: '',
  password: '',
  confirmPassword: '',
  passwordVisible: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VIEW':
      // Reset form fields and messages on view change
      return {
        ...initialState,
        view: action.view,
      };
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.message,
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.message,
      };
    case 'RESET_MESSAGES':
      return {
        ...state,
        error: null,
        success: null,
      };
    default:
      return state;
  }
}

const AuthPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    view,
    email,
    password,
    confirmPassword,
    loading,
    error,
    success,
    passwordVisible,
  } = state;
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  // Auto-focus email input on view change
  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [view]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch({ type: 'RESET_MESSAGES' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'RESET_MESSAGES' });
    dispatch({ type: 'SET_LOADING', loading: true });

    try {
      const trimmedEmail = email.trim();

      if (!trimmedEmail) {
        throw new Error('Email é obrigatório.');
      }

      if (view === 'login') {
        if (!password) {
          throw new Error('Senha é obrigatória.');
        }
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
        navigate('/dashboard', { replace: true });
      } else if (view === 'signup') {
        if (!password || !confirmPassword) {
          throw new Error('Senha e confirmação são obrigatórias.');
        }
        if (password !== confirmPassword) {
          throw new Error('As senhas não coincidem.');
        }
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(password)) {
          throw new Error('Senha deve ter letras e números, mínimo 6 caracteres.');
        }
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        dispatch({ type: 'SET_SUCCESS', message: 'Conta criada com sucesso!' });
        navigate('/dashboard', { replace: true });
      } else if (view === 'forgot') {
        await sendPasswordResetEmail(auth, trimmedEmail);
        dispatch({ type: 'SET_SUCCESS', message: 'Email de recuperação enviado!' });
      }
    } catch (err: any) {
      const msg = err?.message || 'Erro inesperado.';
      dispatch({ type: 'SET_ERROR', message: msg });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Imagem ilustrativa */}
      <div className="hidden md:flex w-1/2 bg-yellow-500 items-center justify-center">
        <img
          src="/logo-meus-investimentos.svg"
          alt="Logo Meus Investimentos"
          loading="lazy"
          className="w-48 h-auto"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="relative max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
            </div>
          )}
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {view === 'login'
              ? 'Entrar'
              : view === 'signup'
              ? 'Criar Conta'
              : 'Recuperar Senha'}
          </h2>

          {(error || success) && (
            <div
              role="alert"
              aria-live="assertive"
              className={`mb-4 p-4 rounded transition-all ${
                error
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
            >
              {error ? `❌ ${error}` : `✅ ${success}`}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
              type="email"
              ref={emailRef}
              aria-label="Email"
              placeholder="Email"
              autoComplete="username"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
              value={email}
              disabled={loading}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
              }
              required
            />
            {view !== 'forgot' && (
              <>
                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    aria-label="Senha"
                    placeholder="Senha"
                    autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                    className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
                    value={password}
                    disabled={loading}
                    onChange={(e) =>
                      dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })
                    }
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'passwordVisible',
                        value: !passwordVisible,
                      })
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  >
                    {passwordVisible ? '🙈' : '👁️'}
                  </button>
                </div>
                {view === 'signup' && (
                  <input
                    type="password"
                    aria-label="Confirmar senha"
                    placeholder="Confirmar senha"
                    autoComplete="new-password"
                    className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
                    value={confirmPassword}
                    disabled={loading}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'confirmPassword',
                        value: e.target.value,
                      })
                    }
                    minLength={6}
                    required
                  />
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {view === 'login'
                ? loading
                  ? 'Entrando...'
                  : 'Entrar'
                : view === 'signup'
                ? loading
                  ? 'Criando conta...'
                  : 'Criar conta'
                : loading
                ? 'Enviando...'
                : 'Enviar link de recuperação'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            {view === 'login' && (
              <>
                <button
                  type="button"
                  className="text-blue-600 hover:underline mr-4"
                  onClick={() => dispatch({ type: 'SET_VIEW', view: 'forgot' })}
                >
                  Esqueci minha senha
                </button>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => dispatch({ type: 'SET_VIEW', view: 'signup' })}
                >
                  Criar conta
                </button>
              </>
            )}
            {view !== 'login' && (
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => dispatch({ type: 'SET_VIEW', view: 'login' })}
              >
                Voltar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
