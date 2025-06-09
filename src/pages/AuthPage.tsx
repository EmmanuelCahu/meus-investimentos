import React, { useEffect, useReducer, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
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
      return { ...initialState, view: action.view };
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.message };
    case 'SET_SUCCESS':
      return { ...state, success: action.message };
    case 'RESET_MESSAGES':
      return { ...state, error: null, success: null };
    default:
      return state;
  }
}

const validatePassword = (password: string): boolean => {
  // Minimum 6 chars, at least one letter and one number
  return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
};

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    role="img"
  >
    {open ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    )}
  </svg>
);

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

  useEffect(() => {
    emailRef.current?.focus();
  }, [view]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch({ type: 'RESET_MESSAGES' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return; // previne múltiplos cliques
      dispatch({ type: 'RESET_MESSAGES' });
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        if (view === 'login') {
          await signInWithEmailAndPassword(auth, email.trim(), password);
          navigate('/dashboard', { replace: true });
        } else if (view === 'signup') {
          if (password !== confirmPassword)
            throw new Error('As senhas não coincidem.');
          if (!validatePassword(password))
            throw new Error(
              'Senha deve ter letras e números, com pelo menos 6 caracteres.'
            );
          await createUserWithEmailAndPassword(auth, email.trim(), password);
          dispatch({ type: 'SET_SUCCESS', message: 'Conta criada com sucesso!' });
          navigate('/dashboard', { replace: true });
        } else {
          await sendPasswordResetEmail(auth, email.trim());
          dispatch({
            type: 'SET_SUCCESS',
            message: 'Email de recuperação enviado! Verifique sua caixa de entrada.',
          });
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Erro inesperado. Tente novamente mais tarde.';
        dispatch({ type: 'SET_ERROR', message });
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [email, password, confirmPassword, view, loading, navigate]
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/3 bg-gray-100 hidden lg:block" aria-hidden="true" />
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-gray-100">
        <img
          src="/Main.png"
          alt="Imagem Principal do sistema Meus Investimentos"
          loading="lazy"
          className="max-w-full max-h-screen object-contain"
          style={{ maxHeight: '80vh' }}
        />
      </div>
      <main
        className="w-full lg:w-1/3 flex items-center justify-center p-6 bg-white"
        aria-label="Formulário de autenticação"
      >
        <section className="relative max-w-md w-full rounded-lg shadow-lg">
          {loading && (
            <div
              className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10"
              role="alert"
              aria-live="assertive"
              aria-busy="true"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
            </div>
          )}
          <h2 className="text-2xl font-semibold mb-6 text-center" tabIndex={-1}>
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
              tabIndex={0}
            >
              {error ? `❌ ${error}` : `✅ ${success}`}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Email"
              autoComplete="username"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              disabled={loading}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })
              }
              required
              aria-describedby={error && view === 'forgot' ? 'email-error' : undefined}
            />

            {view !== 'forgot' && (
              <>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Senha"
                    autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                    className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={password}
                    disabled={loading}
                    onChange={(e) =>
                      dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })
                    }
                    minLength={6}
                    required
                    aria-describedby={
                      error && (view === 'login' || view === 'signup') ? 'password-error' : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'passwordVisible',
                        value: !passwordVisible,
                      })
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    tabIndex={0}
                  >
                    <EyeIcon open={passwordVisible} />
                  </button>
                </div>
              </>
            )}

            {view === 'signup' && (
              <>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirmar Senha
                </label>
                <input
                  id="confirmPassword"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Confirmar Senha"
                  autoComplete="new-password"
                  className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
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
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={loading}
            >
              {view === 'login'
                ? 'Entrar'
                : view === 'signup'
                ? 'Criar Conta'
                : 'Enviar Email'}
            </button>
          </form>

          <nav className="mt-4 flex justify-center space-x-4 text-sm text-blue-600 font-medium">
            {view !== 'login' && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW', view: 'login' })}
                className="underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              >
                Voltar para Entrar
              </button>
            )}

            {view !== 'signup' && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW', view: 'signup' })}
                className="underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              >
                Criar Conta
              </button>
            )}

            {view !== 'forgot' && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW', view: 'forgot' })}
                className="underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              >
                Esqueci a senha
              </button>
            )}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
