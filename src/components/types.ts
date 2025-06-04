// src/components/types.ts

export interface Ativo {
  id: string
  nome: string
  tipo: string
  valor: number
}

export const tiposAtivo = ['Ação', 'FII', 'Criptomoeda', 'Renda Fixa', 'Outros']
