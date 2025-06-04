import React, { useState } from 'react'
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

  const inputBaseStyle = `border rounded p-2 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
    focus:outline-none focus:ring-2 focus:ring-blue-400`

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <DollarSign className="mr-2 text-blue-500" size={20} />
        Novo Ativo
      </h2>

      <form
        onSubmit={e => {
          e.preventDefault()
          setTouched({ nome: true, tipo: true, valor: true, dataCompra: true })
          if (isFormValid && !loading) onSubmit()
        }}
        className="flex flex-col gap-4"
      >
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="mb-1 text-gray-700 dark:text-gray-300 block">
            Nome do Ativo
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: PETR4"
            value={nome}
            onChange={e => setNome(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
            className={`${inputBaseStyle} ${nomeError ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={nomeError}
            aria-describedby={nomeError ? 'nome-error' : undefined}
          />
          {nomeError && <p id="nome-error" className="text-red-600 text-sm mt-1">Nome é obrigatório.</p>}
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="tipo" className="mb-1 text-gray-700 dark:text-gray-300 block">
            Tipo de Ativo
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, tipo: true }))}
            className={`${inputBaseStyle} ${tipoError ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={tipoError}
            aria-describedby={tipoError ? 'tipo-error' : undefined}
          >
            <option value="" disabled>Selecione o tipo</option>
            {tiposAtivo.map(opcao => (
              <option key={opcao} value={opcao}>{opcao}</option>
            ))}
          </select>
          {tipoError && <p id="tipo-error" className="text-red-600 text-sm mt-1">Tipo é obrigatório.</p>}
        </div>

        {/* Valor */}
        <div>
          <label htmlFor="valor" className="mb-1 text-gray-700 dark:text-gray-300 block">
            Valor (R$)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={16} />
            <input
              id="valor"
              type="number"
              placeholder="Ex: 1500.50"
              value={valor}
              onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
              onBlur={() => setTouched(prev => ({ ...prev, valor: true }))}
              className={`${inputBaseStyle} pl-8 ${valorError ? 'border-red-500' : 'border-gray-300'}`}
              min={0}
              step="0.01"
              aria-invalid={valorError}
              aria-describedby={valorError ? 'valor-error' : undefined}
            />
          </div>
          {valorError && <p id="valor-error" className="text-red-600 text-sm mt-1">Valor deve ser maior que zero.</p>}
        </div>

        {/* Data de Compra */}
        <div>
          <label htmlFor="dataCompra" className="mb-1 text-gray-700 dark:text-gray-300 block">
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
              className={`${inputBaseStyle} pl-8 ${dataError ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={dataError}
              aria-describedby={dataError ? 'data-error' : undefined}
            />
          </div>
          {dataError && <p id="data-error" className="text-red-600 text-sm mt-1">Data de compra é obrigatória.</p>}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`mt-2 py-2 px-4 rounded text-white transition ${
            !isFormValid || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Adicionando...' : 'Adicionar Ativo'}
        </button>

        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default AtivoForm
