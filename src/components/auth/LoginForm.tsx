import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSwitch: (view: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export default function LoginForm({ onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full p-3 border rounded-md mb-1 focus:outline-none ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mb-2" id="email-error">
            {errors.email.message}
          </p>
        )}

        <label className="block mb-2 font-semibold" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`w-full p-3 border rounded-md mb-1 focus:outline-none ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby="password-error"
          placeholder="Sua senha"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2" id="password-error">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => onSwitch('forgot')}
          className="text-blue-600 hover:underline text-sm"
          type="button"
        >
          Esqueci minha senha
        </button>
      </div>
      <div className="mt-4 text-center text-sm">
        <span>Não tem conta? </span>
        <button
          onClick={() => onSwitch('signup')}
          className="text-blue-600 font-semibold hover:underline"
          type="button"
        >
          Cadastre-se
        </button>
      </div>
    </>
  );
}
