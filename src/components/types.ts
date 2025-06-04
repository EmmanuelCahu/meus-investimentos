// src/components/types.ts

export interface Ativo {
  id: string
  nome: string
  tipo: string
  valor: number
  dataCompra: string  // ISO date string, ex: "2025-06-05"
}

export const tiposAtivo = ['Ação', 'FII', 'Criptomoeda', 'Renda Fixa', 'Outros']
