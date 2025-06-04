// src/components/PaginatedTable.tsx

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
    currentPage * itemsPerPage,
  )

  if (loadingAtivos) {
    return <p>Carregando ativos...</p>
  }

  if (ativos.length === 0) {
    return <p className="text-gray-500">Nenhum ativo encontrado.</p>
  }

  return (
    <>
      <table
        className="w-full border-collapse"
        aria-label="Tabela de ativos"
        role="table"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Tipo</th>
            <th className="border p-2 text-right">Valor</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagedAtivos.map(ativo => (
            <tr key={ativo.id} role="row" className="hover:bg-gray-50">
              <td className="border p-2" role="cell">
                {ativo.nome}
              </td>
              <td className="border p-2" role="cell">
                {ativo.tipo}
              </td>
              <td className="border p-2 text-right" role="cell">
                R${ativo.valor.toFixed(2)}
              </td>
              <td className="border p-2 text-center" role="cell">
                <button
                  onClick={() => setDeleteId(ativo.id)}
                  aria-label={`Excluir ativo ${ativo.nome}`}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav
          className="mt-4 flex justify-center space-x-2"
          role="navigation"
          aria-label="Paginação de ativos"
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-400 border-gray-300'
                : 'hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-gray-500`}
            aria-disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Página ${page}`}
              >
                {page}
              </button>
            )
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? 'cursor-not-allowed text-gray-400 border-gray-300'
                : 'hover:bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-gray-500`}
            aria-disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            &gt;
          </button>
        </nav>
      )}
    </>
  )
}

export default PaginatedTable
