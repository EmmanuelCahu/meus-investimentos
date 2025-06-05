import React, { useState } from "react";

// Interfaces para os dados dos formulários
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  newPassword: string;
  confirmNewPassword: string;
  token: string; // token para reset recebido por email, etc.
}

type AuthView = "login" | "signup" | "forgot" | "reset";

// Placeholder funções de autenticação - conecte ao seu backend/Firebase aqui
async function loginUser(data: LoginData): Promise<void> {
  // exemplo: await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
  return new Promise((res) => setTimeout(res, 1000));
}

async function signupUser(data: SignupData): Promise<void> {
  // exemplo: criar usuário e validar confirmPassword
  return new Promise((res) => setTimeout(res, 1000));
}

async function sendForgotPasswordEmail(data: ForgotPasswordData): Promise<void> {
  // exemplo: enviar email de recuperação
  return new Promise((res) => setTimeout(res, 1000));
}

async function resetUserPassword(data: ResetPasswordData): Promise<void> {
  // exemplo: resetar senha usando token
  return new Promise((res) => setTimeout(res, 1000));
}

// Componente principal que controla os views
const AuthContainer: React.FC = () => {
  const [view, setView] = useState<AuthView>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string>(""); // para reset password

  // Form state comum para cada formulário
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotData, setForgotData] = useState<ForgotPasswordData>({ email: "" });
  const [resetData, setResetData] = useState<ResetPasswordData>({
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });

  // Handlers

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginUser(loginData);
      // Após login, redirecionar ou atualizar estado global de auth (não implementado aqui)
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (signupData.password !== signupData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await signupUser(signupData);
      // Após cadastro, pode trocar para login automaticamente
      setView("login");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendForgotPasswordEmail(forgotData);
      alert("Email de recuperação enviado! Verifique sua caixa de entrada.");
      setView("login");
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (resetData.newPassword !== resetData.confirmNewPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await resetUserPassword({ ...resetData, token: resetToken });
      alert("Senha alterada com sucesso! Faça login.");
      setView("login");
    } catch (err: any) {
      setError(err.message || "Erro ao alterar a senha.");
    } finally {
      setLoading(false);
    }
  };

  // UI dos formulários

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-6 w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-4">Entrar</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Senha"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        required
        className="input"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div className="flex justify-between text-sm mt-2">
        <button
          type="button"
          onClick={() => setView("forgot")}
          className="text-blue-600 hover:underline"
        >
          Esqueci minha senha
        </button>
        <button
          type="button"
          onClick={() => setView("signup")}
          className="text-blue-600 hover:underline"
        >
          Criar conta
        </button>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignupSubmit} className="space-y-6 w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-4">Criar Conta</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={signupData.email}
        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Senha"
        value={signupData.password}
        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={signupData.confirmPassword}
        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
        required
        className="input"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Criando..." : "Cadastrar"}
      </button>
      <div className="text-sm mt-2">
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-blue-600 hover:underline"
        >
          Voltar ao login
        </button>
      </div>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleForgotSubmit} className="space-y-6 w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-4">Recuperar Senha</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="Seu email"
        value={forgotData.email}
        onChange={(e) => setForgotData({ email: e.target.value })}
        required
        className="input"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Enviando..." : "Enviar email"}
      </button>
      <div className="text-sm mt-2">
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-blue-600 hover:underline"
        >
          Voltar ao login
        </button>
      </div>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleResetSubmit} className="space-y-6 w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-4">Alterar Senha</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="password"
        placeholder="Nova senha"
        value={resetData.newPassword}
        onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={resetData.confirmNewPassword}
        onChange={(e) => setResetData({ ...resetData, confirmNewPassword: e.target.value })}
        required
        className="input"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Alterando..." : "Alterar senha"}
      </button>
      <div className="text-sm mt-2">
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-blue-600 hover:underline"
        >
          Voltar ao login
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Esquerda - imagem */}
      <div className="md:flex-1 hidden md:flex items-center justify-center bg-blue-700">
        <img
          src="/auth-left-image.jpg" // ajuste para sua imagem
          alt="Imagem ilustrativa"
          className="max-w-xs md:max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Direita - formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        {view === "login" && renderLoginForm()}
        {view === "signup" && renderSignupForm()}
        {view === "forgot" && renderForgotForm()}
        {view === "reset" && renderResetForm()}
      </div>
    </div>
  );
};

export default AuthContainer;

/* 
  Tailwind CSS classes usadas:
  .input {
    @apply w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
  .btn-primary {
    @apply bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
  }
*/

// Você pode colocar essas classes no seu arquivo tailwind.css
