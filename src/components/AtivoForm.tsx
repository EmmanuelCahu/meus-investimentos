// src/components/AtivoForm.tsx

import React, { useState } from 'react'
import { DatePicker } from 'react-datepicker' // assume react-datepicker já instalado
import 'react-datepicker/dist/react-datepicker.css'
import { tiposAtivo } from './types'
import { Calendar, DollarSign } from 'lucide-react'

interface AtivoFormProps {
  nome: string
  setNome: React.Dispatch<React.SetStateAction<string>>
  tipo: string
  setTipo: React.Dispatch<React.SetStateAction<string>>
  valor: number | ''
  setValor: React.Dispatch<React.SetStateAction<number | ''>>
  dataCompra: Date
  setDataCompra: React.Dispatch<React.SetStateAction<Date>>
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
  dataCompra,
  setDataCompra,
  onSubmit,
  loading,
  errorMessage,
}) => {
  const [touched, setTouched] = useState({
    nome: false,
    tipo: false,
    valor: false,
    dataCompra: false,
  })

  const nomeError = touched.nome && nome.trim() === ''
  const tipoError = touched.tipo && tipo.trim() === ''
  const valorError = touched.valor && (valor === '' || (typeof valor === 'number' && valor <= 0))
  const dataError = touched.dataCompra && !dataCompra

  const isFormValid = !nomeError && !tipoError && !valorError && !dataError

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        <DollarSign className="inline-block mr-2 text-blue-500" size={20} />
        Novo Ativo
      </h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setTouched({ nome: true, tipo: true, valor: true, dataCompra: true })
          if (isFormValid && !loading) onSubmit()
        }}
        className="flex flex-col gap-4"
        aria-label="Formulário para adicionar ativo"
      >
        {/* Nome */}
        <div className="flex flex-col">
          <label htmlFor="nome" className="mb-1 text-gray-700 dark:text-gray-300">
            Nome do Ativo
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: PETR4"
            value={nome}
            onChange={e => setNome(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
            className={`border rounded p-2 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
              focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                nomeError ? 'border-red-500' : 'border-gray-300'
              }`}
            aria-required="true"
            aria-invalid={nomeError}
            aria-describedby="nome-error"
          />
          {nomeError && (
            <span id="nome-error" className="text-red-600 text-sm mt-1">
              Nome é obrigatório.
            </span>
          )}
        </div>

        {/* Tipo */}
        <div className="flex flex-col">
          <label htmlFor="tipo" className="mb-1 text-gray-700 dark:text-gray-300">
            Tipo de Ativo
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, tipo: true }))}
            className={`border rounded p-2 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                tipoError ? 'border-red-500' : 'border-gray-300'
              }`}
            aria-required="true"
            aria-invalid={tipoError}
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
          {tipoError && (
            <span id="tipo-error" className="text-red-600 text-sm mt-1">
              Tipo é obrigatório.
            </span>
          )}
        </div>

        {/* Valor */}
        <div className="flex flex-col">
          <label htmlFor="valor" className="mb-1 text-gray-700 dark:text-gray-300">
            Valor (R$)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={16} />
            <input
              id="valor"
              type="number"
              placeholder="Ex: 1500.50"
              value={valor}
              onChange={e => {
                const val = e.target.value
                setValor(val === '' ? '' : Number(val))
              }}
              onBlur={() => setTouched(prev => ({ ...prev, valor: true }))}
              className={`border rounded p-2 pl-8 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  valorError ? 'border-red-500' : 'border-gray-300'
                }`}
              min={0}
              step="0.01"
              aria-required="true"
              aria-invalid={valorError}
              aria-describedby="valor-error"
            />
          </div>
          {valorError && (
            <span id="valor-error" className="text-red-600 text-sm mt-1">
              Valor deve ser maior que zero.
            </span>
          )}
        </div>

        {/* Data de Compra */}
        <div className="flex flex-col">
          <label htmlFor="dataCompra" className="mb-1 text-gray-700 dark:text-gray-300">
            Data de Compra
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={16} />
            <input
              id="dataCompra"
              type="date"
              value={dataCompra.toISOString().slice(0, 10)}
              onChange={e => setDataCompra(new Date(e.target.value))}
              onBlur={() => setTouched(prev => ({ ...prev, dataCompra: true }))}
              className={`border rounded p-2 pl-8 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  dataError ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-required="true"
              aria-invalid={dataError}
              aria-describedby="data-error"
            />
          </div>
          {dataError && (
            <span id="data-error" className="text-red-600 text-sm mt-1">
              Data de compra é obrigatória.
            </span>
          )}
        </div>

        {/* Botão Adicionar */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`mt-2 py-2 px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            !isFormValid || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          aria-disabled={!isFormValid || loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Ativo'}
        </button>

        {errorMessage && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}

export default AtivoForm
