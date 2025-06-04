// src/components/AtivoForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAtivos } from '../context/AtivosContext'

interface FormData {
  nome: string
  tipo: string
  valor: number
}

const AtivoForm: React.FC = () => {
  const { addAtivo, loading } = useAtivos()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await addAtivo(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <input
        type="text"
        placeholder="Nome"
        {...register('nome', { required: 'Nome é obrigatório' })}
        className={`border p-2 mr-2 ${errors.nome ? 'border-red-500' : ''}`}
        aria-invalid={errors.nome ? 'true' : 'false'}
      />
      {errors.nome && <span className="text-red-500 mr-2">{errors.nome.message}</span>}

      <input
        type="text"
        placeholder="Tipo"
        {...register('tipo', { required: 'Tipo é obrigatório' })}
        className={`border p-2 mr-2 ${errors.tipo ? 'border-red-500' : ''}`}
        aria-invalid={errors.tipo ? 'true' : 'false'}
      />
      {errors.tipo && <span className="text-red-500 mr-2">{errors.tipo.message}</span>}

      <input
        type="number"
        step="0.01"
        placeholder="Valor"
        {...register('valor', {
          required: 'Valor é obrigatório',
          valueAsNumber: true,
          validate: value => value > 0 || 'Valor deve ser maior que zero',
        })}
        className={`border p-2 mr-2 ${errors.valor ? 'border-red-500' : ''}`}
        aria-invalid={errors.valor ? 'true' : 'false'}
      />
      {errors.valor && <span className="text-red-500 mr-2">{errors.valor.message}</span>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  )
}

export default AtivoForm
