import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { toast } from 'react-toastify';

const schema = z
  .object({
    email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  onSwitch: (view: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export default function SignUpForm({ onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Conta criada com sucesso!');
      onSwitch('login');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar</h2>
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
          placeholder="Senha (mín 6 caracteres)"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2" id="password-error">
            {errors.password.message}
          </p>
        )}

        <label className="block mb-2 font-semibold" htmlFor="confirmPassword">
          Confirmar senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className={`w-full p-3 border rounded-md mb-1 focus:outline-none ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby="confirmPassword-error"
          placeholder="Confirme sua senha"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mb-2" id="confirmPassword-error">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span>Já tem conta? </span>
        <button
          onClick={() => onSwitch('login')}
          className="text-green-600 font-semibold hover:underline"
          type="button"
        >
          Entrar
        </button>
      </div>
    </>
  );
}
