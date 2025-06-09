import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSwitch: (view: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export default function ForgotPasswordForm({ onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success('E-mail de recuperação enviado!');
      onSwitch('login');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar e-mail');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Recuperar senha</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="email">
          Informe seu e-mail
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar e-mail'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <button
          onClick={() => onSwitch('login')}
          className="text-yellow-600 hover:underline"
          type="button"
        >
          Voltar ao login
        </button>
      </div>
    </>
  );
}
