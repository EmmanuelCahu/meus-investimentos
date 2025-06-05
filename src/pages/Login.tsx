import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import MainImage from "../../public/Main.png"; // ajuste conforme necessário se estiver em outra pasta

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/ativos");
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Esquerda - Imagem centralizada */}
      <div className="hidden md:flex w-1/3 bg-white items-center justify-center p-4">
        <img
          src={MainImage}
          alt="Logo"
          className="w-2/3 max-w-[300px] h-auto object-contain"
        />
      </div>

      {/* Meio - Espaço para centralização */}
      <div className="hidden md:flex w-1/3 items-center justify-center"></div>

      {/* Direita - Formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 px-6">
        {/* Logo estilizado */}
        <div
          className="mb-8"
          style={{
            backgroundImage:
              "url('https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png')",
            backgroundPosition: "0px -52px",
            backgroundSize: "auto",
            width: "175px",
            height: "51px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
          aria-label="Meus Investimentos"
          role="img"
        ></div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={75}
            required
            className="w-full border rounded px-3 py-2 text-sm"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            maxLength={75}
            required
            className="w-full border rounded px-3 py-2 text-sm"
            aria-label="Senha"
          />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="flex justify-between text-sm mt-2">
            <Link to="/forgot-password" className="text-blue-600">
              Esqueci a senha
            </Link>
            <Link to="/signup" className="text-blue-600">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
