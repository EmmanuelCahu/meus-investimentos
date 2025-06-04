// src/components/AtivoForm.tsx

import React from 'react'
import { tiposAtivo } from './types'

interface AtivoFormProps {
  nome: string
  setNome: React.Dispatch<React.SetStateAction<string>>
  tipo: string
  setTipo: React.Dispatch<React.SetStateAction<string>>
  valor: number | ''
  setValor: React.Dispatch<React.SetStateAction<number | ''>>
  onSubmit: () => void
  loading: boolean
  errorMessage: string | null
}

const AtivoForm: React.FC<AtivoFormProps> = ({
  nome,
  setNome,
  tipo,
  setTipo,
  valor,
  setValor,
  onSubmit,
  loading,
  errorMessage,
}) => {
  const isFormValid =
    nome.trim() !== '' &&
    tipo.trim() !== '' &&
    valor !== '' &&
    (typeof valor === 'number' ? valor > 0 : false)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (isFormValid && !loading) onSubmit()
      }}
      aria-label="Formulário para adicionar ativo"
      className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-4"
    >
      <div className="flex-1 flex flex-col">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="border p-2 w-full"
          aria-required="true"
          aria-invalid={nome.trim() === ''}
          aria-describedby="nome-error"
        />
        {nome.trim() === '' && (
          <span id="nome-error" className="text-red-600 text-sm">
            Nome é obrigatório.
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="border p-2 w-full"
          aria-required="true"
          aria-invalid={tipo.trim() === ''}
          aria-describedby="tipo-error"
        >
          <option value="" disabled>
            Selecione o tipo
          </option>
          {tiposAtivo.map(tipoItem => (
            <option key={tipoItem} value={tipoItem}>
              {tipoItem}
            </option>
          ))}
        </select>
        {tipo.trim() === '' && (
          <span id="tipo-error" className="text-red-600 text-sm">
            Tipo é obrigatório.
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => {
            const val = e.target.value
            setValor(val === '' ? '' : Number(val))
          }}
          className="border p-2 w-full"
          min={0}
          aria-required="true"
          aria-invalid={valor === '' || (typeof valor === 'number' && valor <= 0)}
          aria-describedby="valor-error"
        />
        {(valor === '' || (typeof valor === 'number' && valor <= 0)) && (
          <span id="valor-error" className="text-red-600 text-sm">
            Valor deve ser maior que zero.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`px-4 py-2 rounded text-white ${
          !isFormValid || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        aria-disabled={!isFormValid || loading}
      >
        {loading ? 'Adicionando...' : 'Adicionar'}
      </button>

      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </form>
  )
}

export default AtivoForm
