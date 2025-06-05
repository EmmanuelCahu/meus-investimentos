import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // ajuste conforme seu setup firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

type AuthMode = "login" | "signup" | "forgot" | "reset";

const AuthContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");

  // Para reset password, espera token no query param (ex: ?oobCode=XXX)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [resetCode, setResetCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Checa hash na URL para definir aba
    const hash = location.hash.replace("#", "");
    if (hash === "signup" || hash === "forgot" || hash === "reset") {
      setMode(hash);
    } else {
      setMode("login");
    }

    // Para reset, captura o código da query string
    const query = new URLSearchParams(location.search);
    const oobCode = query.get("oobCode");
    if (oobCode) {
      setMode("reset");
      setResetCode(oobCode);
    }
  }, [location]);

  // Reseta estados ao trocar aba
  useEffect(() => {
    setError(null);
    setMessage(null);
    setPassword("");
    setPasswordConfirm("");
    setEmail("");
  }, [mode]);

  const onLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro no login");
    }
    setLoading(false);
  };

  const onSignup = async () => {
    setLoading(true);
    setError(null);
    if (password !== passwordConfirm) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro no cadastro");
    }
    setLoading(false);
  };

  const onForgot = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email para recuperação enviado! Verifique sua caixa de entrada.");
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação");
    }
    setLoading(false);
  };

  const onReset = async () => {
    if (!resetCode) {
      setError("Código de recuperação inválido");
      return;
    }
    if (password !== passwordConfirm) {
      setError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await confirmPasswordReset(auth, resetCode, password);
      setMessage("Senha alterada com sucesso! Você pode fazer login agora.");
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir senha");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
        {/* Tabs */}
        <nav className="flex justify-around mb-6 border-b border-gray-300 dark:border-gray-700">
          {["login", "signup", "forgot"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 -mb-px font-semibold border-b-2 ${
                mode === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600"
              }`}
              onClick={() => {
                setMode(tab as AuthMode);
                navigate(`#${tab}`);
              }}
            >
              {tab === "login"
                ? "Entrar"
                : tab === "signup"
                ? "Cadastrar"
                : "Esqueci a senha"}
            </button>
          ))}
        </nav>

        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</div>
        )}
        {message && (
          <div className="mb-4 text-green-600 dark:text-green-400 font-medium">{message}</div>
        )}

        {/* Conteúdo conforme aba */}
        {(mode === "login" || mode === "signup") && (
          <>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </label>

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Senha
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                disabled={loading}
              />
            </label>

            {mode === "signup" && (
              <label className="block mb-4 font-semibold text-gray-700 dark:text-gray-300">
                Confirmar Senha
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                />
              </label>
            )}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={mode === "login" ? onLogin : onSignup}
              disabled={loading || !email || !password || (mode === "signup" && password !== passwordConfirm)}
            >
              {loading ? "Carregando..." : mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </>
        )}

        {mode === "forgot" && (
          <>
            <label className="block mb-4 font-semibold text-gray-700 dark:text-gray-300">
              Informe seu email para recuperação
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </label>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={onForgot}
              disabled={loading || !email}
            >
              {loading ? "Carregando..." : "Enviar email"}
            </button>
          </>
        )}

        {mode === "reset" && (
          <>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Nova senha
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
            </label>
            <label className="block mb-4 font-semibold text-gray-700 dark:text-gray-300">
              Confirmar nova senha
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
            </label>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={onReset}
              disabled={loading || !password || password !== passwordConfirm}
            >
              {loading ? "Carregando..." : "Redefinir senha"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
