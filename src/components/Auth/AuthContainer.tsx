import React, { useState } from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import Alerts from "./Alerts";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";

interface AuthContainerProps {
  oobCode?: string; // código para reset de senha enviado no link
  onSuccessLogin: () => void; // callback após login bem-sucedido
}

const AuthContainer: React.FC<AuthContainerProps> = ({ oobCode, onSuccessLogin }) => {
  const auth = getAuth();

  // Define tab inicial: se tem oobCode, forçamos a aba reset, senão login
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot" | "reset">(oobCode ? "reset" : "login");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();

  async function handleLogin({ email, password }: { email: string; password: string }) {
    setLoading(true);
    setErrorMsg(undefined);
    setSuccessMsg(undefined);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Login realizado com sucesso!");
      setTimeout(() => {
        onSuccessLogin();
      }, 1000);
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup({ email, password }: { email: string; password: string; confirmPassword: string }) {
    setLoading(true);
    setErrorMsg(undefined);
    setSuccessMsg(undefined);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Cadastro realizado com sucesso! Você já está logado.");
      setTimeout(() => {
        onSuccessLogin();
      }, 1000);
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(email: string) {
    setLoading(true);
    setErrorMsg(undefined);
    setSuccessMsg(undefined);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Email enviado! Verifique sua caixa de entrada.");
      setCurrentTab("login");
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword({ password }: { password: string; confirmPassword: string }) {
    if (!oobCode) {
      setErrorMsg("Código inválido ou expirado.");
      return;
    }
    setLoading(true);
    setErrorMsg(undefined);
    setSuccessMsg(undefined);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccessMsg("Senha alterada com sucesso! Faça login agora.");
      setCurrentTab("login");
    } catch (error: any) {
      setErrorMsg(getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  }

  function getFriendlyError(error: any): string {
    // Personalizar mensagens mais comuns de erro Firebase
    if (!error || !error.code) return "Erro desconhecido. Tente novamente.";
    switch (error.code) {
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/email-already-in-use":
        return "Este email já está em uso.";
      case "auth/invalid-email":
        return "Email inválido.";
      case "auth/weak-password":
        return "Senha fraca. Use pelo menos 6 caracteres.";
      case "auth/expired-action-code":
        return "O código para alteração de senha expirou.";
      case "auth/invalid-action-code":
        return "Código inválido.";
      default:
        return error.message || "Erro desconhecido. Tente novamente.";
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-md">
      <AuthTabs currentTab={currentTab} onChangeTab={(tab) => { setErrorMsg(undefined); setSuccessMsg(undefined); setCurrentTab(tab); }} />
      <Alerts error={errorMsg} success={successMsg} />
      {currentTab === "login" && <LoginForm onSubmit={handleLogin} isLoading={loading} />}
      {currentTab === "signup" && <SignupForm onSubmit={handleSignup} isLoading={loading} />}
      {currentTab === "forgot" && <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={loading} />}
      {currentTab === "reset" && <ResetPasswordForm onSubmit={handleResetPassword} isLoading={loading} />}
    </div>
  );
};

export default AuthContainer;
