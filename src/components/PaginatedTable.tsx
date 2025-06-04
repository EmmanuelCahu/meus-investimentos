import React from 'react';
import { Ativo } from './types';
import { Trash2 } from 'lucide-react';

interface PaginatedTableProps {
  data: Ativo[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
}) => {
  if (data.length === 0) {
    return <p className="text-center py-4 text-gray-600 dark:text-gray-400">Nenhum dado para exibir.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Nome</th>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-right">Valor (R$)</th>
            <th className="py-2 px-4 text-center">Data Compra</th>
            <th className="py-2 px-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ativo => (
            <tr
              key={ativo.id}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <td className="py-2 px-4">{ativo.nome}</td>
              <td className="py-2 px-4">{ativo.tipo}</td>
              <td className="py-2 px-4 text-right">
                {ativo.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="py-2 px-4 text-center">
                {new Date(ativo.dataCompra.seconds ? ativo.dataCompra.seconds * 1000 : ativo.dataCompra).toLocaleDateString('pt-BR')}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  aria-label={`Excluir ativo ${ativo.nome}`}
                  onClick={() => onDelete(ativo.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <nav
        className="mt-4 flex justify-center items-center gap-3"
        aria-label="Navegação de páginas"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
          aria-disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          ‹
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`px-3 py-1 rounded border border-gray-300 dark:border-gray-600 ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
          aria-disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          ›
        </button>
      </nav>
    </div>
  );
};

export default PaginatedTable;
