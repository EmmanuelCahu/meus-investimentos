// src/components/Filters.tsx

import React from 'react'
import { tiposAtivo } from './types'

interface FiltersProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  filterTipo: string
  setFilterTipo: React.Dispatch<React.SetStateAction<string>>
  orderByField: 'nome' | 'valor'
  setOrderByField: React.Dispatch<React.SetStateAction<'nome' | 'valor'>>
  orderDirection: 'asc' | 'desc'
  setOrderDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>
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
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 gap-2">
    <input
      type="text"
      placeholder="Buscar por nome..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="border p-2 flex-1"
      aria-label="Buscar ativos por nome"
    />

    <select
      value={filterTipo}
      onChange={e => setFilterTipo(e.target.value)}
      className="border p-2"
      aria-label="Filtrar ativos por tipo"
    >
      <option value="">Todos os tipos</option>
      {tiposAtivo.map(tipoItem => (
        <option key={tipoItem} value={tipoItem}>
          {tipoItem}
        </option>
      ))}
    </select>

    <select
      value={orderByField}
      onChange={e => setOrderByField(e.target.value as 'nome' | 'valor')}
      className="border p-2"
      aria-label="Ordenar ativos por"
    >
      <option value="nome">Nome</option>
      <option value="valor">Valor</option>
    </select>

    <select
      value={orderDirection}
      onChange={e => setOrderDirection(e.target.value as 'asc' | 'desc')}
      className="border p-2"
      aria-label="Direção da ordenação"
    >
      <option value="asc">Crescente</option>
      <option value="desc">Decrescente</option>
    </select>
  </div>
)

export default Filters
