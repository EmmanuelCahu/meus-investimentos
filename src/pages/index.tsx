import React, { useState, useEffect } from "react";
import Image from "next/image";
import { auth } from "@lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import Alerts from "@/components/Auth/Alerts";

type FormType = "login" | "signup" | "forgot";

export default function Home() {
  const [formType, setFormType] = useState<FormType>("login");
  const [user, setUser] = useState<null | { email: string }>(null);
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser({ email: currentUser.email ?? "" });
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setFormType("login");
  };

  // Mostra menu se estiver logado
  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-100 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Meus Investimentos</h1>
          <nav className="space-x-4">
            <button className="hover:underline" onClick={() => alert("Ir para Dashboard")}>Dashboard</button>
            <button className="hover:underline" onClick={() => alert("Ir para Ativos")}>Ativos</button>
            <button className="hover:underline" onClick={() => alert("Ir para Mercado")}>Mercado</button>
            <button className="hover:underline" onClick={() => alert("Ir para Recomendações")}>Recomendações</button>
            <button className="hover:underline" onClick={() => alert("Ir para Educação")}>Educação</button>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 border rounded hover:bg-red-500 hover:text-white transition"
            >
              Sair
            </button>
          </nav>
        </header>
        <main className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl">Bem-vindo, {user.email}</h2>
        </main>
      </div>
    );
  }

  // Usuário não está logado, mostra tela com imagem + formulário dinâmico
  return (
    <div className="min-h-screen flex">
      {/* Imagem à esquerda */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center">
        <Image src="/Main.png" alt="Imagem principal" width={400} height={400} className="object-contain" />
      </div>

      {/* Formulário à direita */}
      <AuthContainer title="Meus Investimentos">
        <Alerts alert={alert} />
        {formType === "login" && (
          <LoginForm
            onSwitchToForgot={() => {
              setAlert(null);
              setFormType("forgot");
            }}
            onSwitchToSignup={() => {
              setAlert(null);
              setFormType("signup");
            }}
            onSuccess={() => {
              setAlert(null);
              // Usuário vai estar logado, onAuthStateChanged atualizará a UI
            }}
            onError={(message) => setAlert({ type: "error", message })}
          />
        )}
        {formType === "forgot" && (
          <ForgotPasswordForm
            onSwitchToLogin={() => {
              setAlert(null);
              setFormType("login");
            }}
            onSuccess={(message) => setAlert({ type: "success", message })}
            onError={(message) => setAlert({ type: "error", message })}
          />
        )}
        {formType === "signup" && (
          <SignupForm
            onSwitchToLogin={() => {
              setAlert(null);
              setFormType("login");
            }}
            onSuccess={() => {
              setAlert(null);
              // Usuário logado após cadastro
            }}
            onError={(message) => setAlert({ type: "error", message })}
          />
        )}
      </AuthContainer>
    </div>
  );
}
