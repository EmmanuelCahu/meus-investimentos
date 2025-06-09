import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { toast } from 'react-toastify';

const schema = z
  .object({
    newPassword: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
    confirmNewPassword: z.string().min(6, 'Confirmação obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Senhas não conferem',
    path: ['confirmNewPassword'],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  onSwitch: (view: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export default function ResetPasswordForm({ onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // O código de verificação da senha será obtido da URL
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get('oobCode') || '';

  const onSubmit = async (data: FormData) => {
    try {
      if (!oobCode) throw new Error('Código de verificação inválido ou expirado.');
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      toast.success('Senha redefinida com sucesso!');
      onSwitch('login');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao redefinir senha');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Redefinir senha</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="newPassword">
          Nova senha
        </label>
        <input
          id="newPassword"
          type="password"
          {...register('newPassword')}
          className={`w-full p-3 border rounded-md mb-1 focus:outline-none ${
            errors.newPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.newPassword ? 'true' : 'false'}
          aria-describedby="newPassword-error"
          placeholder="Nova senha (mín 6 caracteres)"
        />
        {errors.newPassword && (
          <p className="text-red-600 text-sm mb-2" id="newPassword-error">
            {errors.newPassword.message}
          </p>
        )}

        <label className="block mb-2 font-semibold" htmlFor="confirmNewPassword">
          Confirmar nova senha
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          {...register('confirmNewPassword')}
          className={`w-full p-3 border rounded-md mb-1 focus:outline-none ${
            errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.confirmNewPassword ? 'true' : 'false'}
          aria-describedby="confirmNewPassword-error"
          placeholder="Confirme a nova senha"
        />
        {errors.confirmNewPassword && (
          <p className="text-red-600 text-sm mb-2" id="confirmNewPassword-error">
            {errors.confirmNewPassword.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Redefinindo...' : 'Redefinir senha'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <button
          onClick={() => onSwitch('login')}
          className="text-purple-600 font-semibold hover:underline"
          type="button"
        >
          Voltar para login
        </button>
      </div>
    </>
  );
}
