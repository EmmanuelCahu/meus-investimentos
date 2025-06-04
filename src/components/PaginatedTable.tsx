import React from 'react'
import { Ativo } from './types'

interface PaginatedTableProps {
  ativos: Ativo[]
  loadingAtivos: boolean
  deleteId: string | null
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  ativos,
  loadingAtivos,
  deleteId,
  setDeleteId,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(ativos.length / itemsPerPage)
  const pagedAtivos = ativos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loadingAtivos) return <p>Carregando ativos...</p>
  if (ativos.length === 0) return <p className="text-gray-500">Nenhum ativo encontrado.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" role="table" aria-label="Tabela de ativos">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Tipo</th>
            <th className="border p-2 text-right">Valor</th>
            <th className="border p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagedAtivos.map(ativo => (
            <tr key={ativo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border p-2">{ativo.nome}</td>
              <td className="border p-2">{ativo.tipo}</td>
              <td className="border p-2 text-right">R$ {ativo.valor.toFixed(2)}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => setDeleteId(ativo.id)}
                  className="text-red-600 hover:underline"
                  aria-label={`Remover ativo ${ativo.nome}`}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PaginatedTable
