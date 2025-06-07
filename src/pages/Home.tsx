aaa// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Bem-vindo ao Meus Investimentos
      </h1>
      <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
        Sua plataforma para gerenciar investimentos, analisar ativos e construir sua carteira ideal.
      </p>
      <buttonaaimport { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/Toast";

export default function Home() {
  const [formType, setFormType] = useState<"login" | "signup" | "forgot" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, resetPassword } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (formType === "login") {
        await login(email, password);
        toast.success("Login realizado com sucesso!");
      } else if (formType === "signup") {
        if (password !== confirmPassword) {
          toast.error("As senhas não coincidem.");
          return;
        }
        await signup(email, password);
        toast.success("Conta criada com sucesso!");
        setFormType("login");
      } else if (formType === "forgot") {
        await resetPassword(email);
        toast.success("Email de recuperação enviado!");
        setFormType("login");
      } else if (formType === "reset") {
        // Simulação
        toast.success("Senha redefinida!");
        setFormType("login");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Imagem principal (esquerda + centro) */}
      <div className="w-2/3 bg-gray-100 flex items-center justify-center">
        <img
          src="/Main.png"
          alt="Imagem principal"
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>

      {/* Formulário (lado direito) */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 bg-white shadow-lg">
        <img
          src="/logo-meus-investimentos.png"
          alt="Logo"
          className="h-20 mb-8"
        />

        <div className="w-full max-w-xs space-y-4">
          {formType === "signup" && (
            <Input
              placeholder="Seu nome (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {(formType === "login" || formType === "signup" || formType === "forgot") && (
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {(formType === "login" || formType === "signup") && (
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {formType === "signup" && (
            <Input
              placeholder="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {formType === "reset" && (
            <>
              <Input
                placeholder="Nova senha"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                placeholder="Confirmar nova senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Processando..." : (
              formType === "login" ? "Log In" :
              formType === "signup" ? "Criar Conta" :
              formType === "forgot" ? "Recuperar Senha" :
              "Salvar Senha"
            )}
aa
          {/* Links dinâmicos */}
          <div className="text-center text-sm text-gray-500">
            {formType === "login" && (
              <>
                <button onClick={() => setFormType("signup")} className="text-blue-500 hover:underline">
                  Criar conta
                </button>
                {" | "}
                <button onClick={() => setFormType("forgot")} className="text-blue-500 hover:underline">
                  Esqueci minha senha
                </button>
              </>
            )}

            {(formType === "signup" || formType === "forgot" || formType === "reset") && (
              <button onClick={() => setFormType("login")} className="text-blue-500 hover:underline">
                Voltar para login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
z
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition"
        onClick={() => navigate("/")}
      >
        Entrar ou Cadastrar
      </button>
    </div>
  );
};

export default Home;
