"use client";

import React, { useState, useEffect } from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import Alerts from "./Alerts";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

interface AuthContainerProps {
  oobCode?: string;
  defaultTab?: "login" | "signup" | "forgot" | "reset";
  onSuccessLogin: () => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  oobCode,
  defaultTab = "login",
  onSuccessLogin,
}) => {
  const auth = getAuth();

  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot" | "reset">(
    oobCode ? "reset" : defaultTab
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();

  useEffect(() => {
    if (oobCode) {
      setCurrentTab("reset");
    }
  }, [oobCode]);

  const clearMessages = () => {
    setErrorMsg(undefined);
    setSuccessMsg(undefined);
  };

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    clearMessages();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Login realizado com sucesso!");
      setTimeout(onSuccessLogin, 1000);
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    clearMessages();

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Cadastro realizado com sucesso! Você já está logado.");
      setTimeout(onSuccessLogin, 1000);
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    clearMessages();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Email enviado com sucesso! Verifique sua caixa de entrada.");
      setCurrentTab("login");
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!oobCode) {
      setErrorMsg("Código inválido ou expirado.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    clearMessages();

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccessMsg("Senha alterada com sucesso! Faça login.");
      setCurrentTab("login");
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyError = (error: any): string => {
    if (!error || !error.code) return "Erro desconhecido. Tente novamente.";

    const map: Record<string, string> = {
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/email-already-in-use": "Este email já está em uso.",
      "auth/invalid-email": "Email inválido.",
      "auth/weak-password": "Senha fraca. Use pelo menos 6 caracteres.",
      "auth/expired-action-code": "O código de redefinição expirou.",
      "auth/invalid-action-code": "Código inválido ou expirado.",
      "auth/missing-password": "A senha é obrigatória.",
    };

    return map[error.code] || error.message || "Erro desconhecido. Tente novamente.";
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-lg">
      <AuthTabs
        currentTab={currentTab}
        onChangeTab={(tab) => {
          clearMessages();
          setCurrentTab(tab);
        }}
      />

      <Alerts error={errorMsg} success={successMsg} />

      {currentTab === "login" && (
        <LoginForm onSubmit={handleLogin} isLoading={loading} />
      )}

      {currentTab === "signup" && (
        <SignupForm onSubmit={handleSignup} isLoading={loading} />
      )}

      {currentTab === "forgot" && (
        <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={loading} />
      )}

      {currentTab === "reset" && (
        <ResetPasswordForm onSubmit={handleResetPassword} isLoading={loading} />
      )}
    </div>
  );
};

export default AuthContainer;
