import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

interface Ativo {
  id: string
  nome: string
  tipo: string
  valor: number
}

const tiposAtivo = ['Ação', 'FII', 'Criptomoeda', 'Renda Fixa', 'Outros']

// Componente para o modal simples de confirmação
const ModalConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  message: string
}) => {
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

// Formulário para adicionar ativo separado
const FormAtivo = ({
  nome,
  setNome,
  tipo,
  setTipo,
  valor,
  setValor,
  onSubmit,
  loading,
  errorMessage,
}: {
  nome: string
  setNome: React.Dispatch<React.SetStateAction<string>>
  tipo: string
  setTipo: React.Dispatch<React.SetStateAction<string>>
  valor: number | ''
  setValor: React.Dispatch<React.SetStateAction<number | ''>>
  onSubmit: () => void
  loading: boolean
  errorMessage: string | null
}) => {
  const isFormValid = nome.trim() !== '' && tipo.trim() !== '' && valor !== '' && valor > 0

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (isFormValid && !loading) onSubmit()
      }}
      aria-label="Formulário para adicionar ativo"
      className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4"
    >
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        className="border p-2 mb-2 sm:mb-0 flex-1"
        aria-required="true"
        aria-invalid={nome.trim() === ''}
        aria-describedby="nome-error"
      />
      {nome.trim() === '' && (
        <span id="nome-error" className="text-red-600 text-sm mb-2 sm:mb-0">
          Nome é obrigatório.
        </span>
      )}

      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        className="border p-2 mb-2 sm:mb-0 flex-1"
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
        <span id="tipo-error" className="text-red-600 text-sm mb-2 sm:mb-0">
          Tipo é obrigatório.
        </span>
      )}

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={e => {
          const val = e.target.value
          setValor(val === '' ? '' : Number(val))
        }}
        className="border p-2 mb-2 sm:mb-0 flex-1"
        min={0}
        aria-required="true"
        aria-invalid={valor === '' || valor <= 0}
        aria-describedby="valor-error"
      />
      {(valor === '' || valor <= 0) && (
        <span id="valor-error" className="text-red-600 text-sm mb-2 sm:mb-0">
          Valor deve ser maior que zero.
        </span>
      )}

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`px-4 py-2 rounded text-white ${
          !isFormValid || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-disabled={!isFormValid || loading}
      >
        {loading ? 'Adicionando...' : 'Adicionar'}
      </button>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </form>
  )
}

const Ativos: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([])
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState<number | ''>('')

  const [loading, setLoading] = useState(false)
  const [loadingAtivos, setLoadingAtivos] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const ativosCollection = collection(db, 'ativos')

  // Buscar ativos
  const fetchAtivos = async () => {
    try {
      setLoadingAtivos(true)
      const data = await getDocs(ativosCollection)
      setAtivos(data.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ativo[])
    } catch (error) {
      setErrorMessage('Erro ao carregar ativos. Tente novamente.')
      console.error('fetchAtivos error:', error)
    } finally {
      setLoadingAtivos(false)
    }
  }

  useEffect(() => {
    fetchAtivos()
  }, [])

  // Adicionar ativo
  const handleAddAtivo = async () => {
    if (!nome || !tipo || valor === '' || valor <= 0) return
    try {
      setLoading(true)
      setErrorMessage(null)
      await addDoc(ativosCollection, { nome, tipo, valor: Number(valor) })
      setNome('')
      setTipo('')
      setValor('')
      fetchAtivos()
    } catch (error) {
      setErrorMessage('Erro ao adicionar ativo. Tente novamente.')
      console.error('handleAddAtivo error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Confirmar exclusão
  const confirmDeleteAtivo = async () => {
    if (!deleteId) return
    try {
      setLoading(true)
      setErrorMessage(null)
      await deleteDoc(doc(db, 'ativos', deleteId))
      setDeleteId(null)
      fetchAtivos()
    } catch (error) {
      setErrorMessage('Erro ao excluir ativo. Tente novamente.')
      console.error('confirmDeleteAtivo error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Ativos</h2>

      <FormAtivo
        nome={nome}
        setNome={setNome}
        tipo={tipo}
        setTipo={setTipo}
        valor={valor}
        setValor={setValor}
        onSubmit={handleAddAtivo}
        loading={loading}
        errorMessage={errorMessage}
      />

      {loadingAtivos ? (
        <p>Carregando ativos...</p>
      ) : (
        <ul role="list" className="border rounded divide-y divide-gray-200">
          {ativos.length === 0 && <li className="p-4 text-center text-gray-500">Nenhum ativo cadastrado.</li>}
          {ativos.map(ativo => (
            <li
              key={ativo.id}
              className="flex justify-between items-center p-4 hover:bg-gray-50"
              role="listitem"
            >
              <span>
                <strong>{ativo.nome}</strong> - {ativo.tipo} - R${' '}
                {ativo.valor.toFixed(2)}
              </span>
              <button
                onClick={() => setDeleteId(ativo.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                aria-label={`Excluir ativo ${ativo.nome}`}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}

      <ModalConfirm
        isOpen={!!deleteId}
        message="Tem certeza que deseja excluir este ativo?"
        onConfirm={confirmDeleteAtivo}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default Ativos
