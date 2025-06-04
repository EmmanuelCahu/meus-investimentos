// src/types/index.ts

// Lista oficial dos tipos de ativos permitidos no sistema
export const tiposAtivo = [
  'Ação',
  'FII',
  'Criptomoeda',
  'Renda Fixa',
  'Tesouro Direto',
  'ETF',
  'Opção',
] as const;

// Tipo literal que representa os valores válidos do array acima
export type TipoAtivo = (typeof tiposAtivo)[number];

// Interface para representar um ativo
export interface Ativo {
  nome: string;
  tipo: TipoAtivo;
  valor: number;
  dataCompra: Date;
}
