// src/components/PaginatedCards.tsx

import React from 'react'
import { Ativo } from './types'
import { Trash2, Calendar, Tag, DollarSign } from 'lucide-react'

interface PaginatedCardsProps {
  ativos: Ativo[]
  loadingAtivos: boolean
  deleteId: string | null
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number
}

const PaginatedCards: React.FC<PaginatedCardsProps> = ({
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

  if (loadingAtivos) {
    return <p className="text-center text-gray-500 dark:text-gray-300">Carregando ativos...</p>
  }

  if (ativos.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-300">Nenhum ativo encontrado.</p>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedAtivos.map(ativo => (
          <div
            key={ativo.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                <Tag className="mr-2 text-blue-500" size={20} />
                {ativo.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center">
                <Calendar className="mr-2 text-gray-500 dark:text-gray-400" size={16} />
                {new Date(ativo.dataCompra).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <DollarSign className="mr-2 text-green-500" size={16} />
                R$ {ativo.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button
              onClick={() => setDeleteId(ativo.id)}
              aria-label={`Excluir ativo ${ativo.nome}`}
              className="mt-4 self-end px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <nav
          className="mt-6 flex justify-center space-x-2"
          role="navigation"
          aria-label="Paginação de ativos"
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-400 border-gray-300 dark:border-gray-700'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
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
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
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
                ? 'cursor-not-allowed text-gray-400 border-gray-300 dark:border-gray-700'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
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

export default PaginatedCards
