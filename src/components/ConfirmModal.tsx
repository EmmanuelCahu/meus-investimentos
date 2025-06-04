// src/components/Filters.tsx

import React from 'react'
import { tiposAtivo } from './types'
import { Filter, Search } from 'lucide-react'

interface FiltersProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  filterTipo: string
  setFilterTipo: React.Dispatch<React.SetStateAction<string>>
  orderByField: 'nome' | 'valor' | 'dataCompra'
  setOrderByField: React.Dispatch<React.SetStateAction<'nome' | 'valor' | 'dataCompra'>>
  orderDirection: 'asc' | 'desc'
  setOrderDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>
  openAdvancedFilters: () => void
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterTipo,
  setFilterTipo,
  orderByField,
  setOrderByField,
  orderDirection,
  setOrderDirection,
  openAdvancedFilters,
}) => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    {/* Busca */}
    <div className="flex items-center flex-1 gap-2">
      <Search className="text-gray-500 dark:text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Buscar ativos por nome"
      />
    </div>

    {/* Filtro por Tipo */}
    <div className="flex items-center gap-2">
      <select
        value={filterTipo}
        onChange={e => setFilterTipo(e.target.value)}
        className="border rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Filtrar ativos por tipo"
      >
        <option value="">Todos os tipos</option>
        {tiposAtivo.map(tipoItem => (
          <option key={tipoItem} value={tipoItem}>
            {tipoItem}
          </option>
        ))}
      </select>
      <Filter
        onClick={openAdvancedFilters}
        className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        size={24}
        title="Filtros avançados"
      />
    </div>

    {/* Ordenação */}
    <div className="flex items-center gap-2">
      <select
        value={orderByField}
        onChange={e => setOrderByField(e.target.value as 'nome' | 'valor' | 'dataCompra')}
        className="border rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Ordenar ativos por"
      >
        <option value="nome">Nome</option>
        <option value="valor">Valor</option>
        <option value="dataCompra">Data de Compra</option>
      </select>

      <select
        value={orderDirection}
        onChange={e => setOrderDirection(e.target.value as 'asc' | 'desc')}
        className="border rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Direção da ordenação"
      >
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
    </div>
  </div>
)

export default Filters
