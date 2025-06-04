// src/components/AtivosList.tsx
import React, { useState, useMemo } from 'react'
import { useAtivos, Ativo } from '../context/AtivosContext'
import ConfirmModal from './ConfirmModal'

const AtivosList: React.FC = () => {
  const { ativos, loading, deleteAtivo } = useAtivos()
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'nome' | 'tipo' | 'valor'>('nome')
  const [sortAsc, setSortAsc] = useState(true)

  const filteredAtivos = useMemo(() => {
    return ativos
      .filter(a =>
        a.nome.toLowerCase().includes(search.toLowerCase()) ||
        a.tipo.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        let comp = 0
        if (sortBy === 'valor') {
          comp = a.valor - b.valor
        } else {
          comp = a[sortBy].localeCompare(b[sortBy])
        }
        return sortAsc ? comp : -comp
      })
  }, [ativos, search, sortBy, sortAsc])

  const totalValor = useMemo(() => {
    return filteredAtivos.reduce((acc, curr) => acc + curr.valor, 0)
  }, [filteredAtivos])

  const handleDelete = (id: string) => {
    setConfirmId(id)
  }

  const confirmDelete = async () => {
    if (confirmId) {
      await deleteAtivo(confirmId)
      setConfirmId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar por nome ou tipo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 flex-grow"
          aria-label="Buscar ativos"
        />
        <div className="flex gap-2">
          <select
            aria-label="Ordenar por"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="border p-2"
          >
            <option value="nome">Nome</option>
            <option value="tipo">Tipo</option>
            <option value="valor">Valor</option>
          </select>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            aria-label="Alternar ordem"
            className="border p-2"
          >
            {sortAsc ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {loading && <p>Carregando ativos...</p>}
      {!loading && filteredAtivos.length === 0 && <p>Nenhum ativo encontrado.</p>}

      <table className="w-full border-collapse border border-gray-300" aria-live="polite">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Nome</th>
            <th className="border border-gray-300 p-2 text-left">Tipo</th>
            <th className="border border-gray-300 p-2 text-right">Valor (R$)</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAtivos.map(({ id, nome, tipo, valor }) => (
            <tr key={id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{nome}</td>
              <td className="border border-gray-300 p-2">{tipo}</td>
              <td className="border border-gray-300 p-2 text-right">{valor.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:underline"
                  aria-label={`Excluir ativo ${nome}`}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {filteredAtivos.length > 0 && (
            <tr className="font-bold">
              <td colSpan={2} className="border border-gray-300 p-2 text-right">
                Total:
              </td>
              <td className="border border-gray-300 p-2 text-right">{totalValor.toFixed(2)}</td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={!!confirmId}
        message="Tem certeza que deseja excluir este ativo?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}

export default AtivosList
