// src/components/AtivoForm.tsx

import React, { useState, useCallback } from 'react';
import { tiposAtivo, TipoAtivo } from '@/types';
import { Calendar, DollarSign } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface AtivoFormProps {
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  tipo: TipoAtivo | '';
  setTipo: React.Dispatch<React.SetStateAction<TipoAtivo | ''>>;
  valor: number | '';
  setValor: React.Dispatch<React.SetStateAction<number | ''>>;
  dataCompra: Date | null;
  setDataCompra: React.Dispatch<React.SetStateAction<Date | null>>;
  onSubmit: () => void;
  loading: boolean;
  errorMessage: string | null;
}

const AtivoForm: React.FC<AtivoFormProps> = ({
  nome,
  setNome,
  tipo,
  setTipo,
  valor,
  setValor,
  dataCompra,
  setDataCompra,
  onSubmit,
  loading,
  errorMessage,
}) => {
  const [touched, setTouched] = useState({
    nome: false,
    tipo: false,
    valor: false,
    dataCompra: false,
  });

  // Validações
  const nomeError = touched.nome && nome.trim() === '';
  const tipoError = touched.tipo && tipo === '';
  const valorError = touched.valor && (valor === '' || valor <= 0);
  const dataError =
    touched.dataCompra && (dataCompra === null || isNaN(dataCompra.getTime()));

  const isFormValid = !nomeError && !tipoError && !valorError && !dataError;

  // Converte Date para string no formato YYYY-MM-DD ou '' se nulo
  const dataCompraStr = dataCompra ? dataCompra.toISOString().slice(0, 10) : '';

  // Reutiliza a função de onBlur para atualizar touched state
  const handleBlur = useCallback(
    (field: keyof typeof touched) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <DollarSign className="mr-2 text-blue-500" size={20} />
        Novo Ativo
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched({
            nome: true,
            tipo: true,
            valor: true,
            dataCompra: true,
          });
          if (isFormValid && !loading) onSubmit();
        }}
        className="flex flex-col gap-4"
        noValidate
        aria-live="polite"
      >
        <Input
          id="nome"
          label="Nome do Ativo"
          placeholder="Ex: PETR4"
          value={nome}
          onChange={(e) => setNome(e.target.value.toUpperCase())}
          onBlur={() => handleBlur('nome')}
          error={nomeError ? 'Nome é obrigatório.' : undefined}
          autoComplete="off"
          disabled={loading}
          required
          aria-invalid={!!nomeError}
          aria-describedby={nomeError ? 'nome-error' : undefined}
        />

        <Select
          id="tipo"
          label="Tipo de Ativo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoAtivo)}
          onBlur={() => handleBlur('tipo')}
          error={tipoError ? 'Tipo é obrigatório.' : undefined}
          options={[
            { value: '', label: 'Selecione o tipo', disabled: true },
            ...tiposAtivo.map((opcao) => ({
              value: opcao,
              label: opcao,
            })),
          ]}
          disabled={loading}
          required
          aria-invalid={!!tipoError}
          aria-describedby={tipoError ? 'tipo-error' : undefined}
        />

        <Input
          id="valor"
          type="number"
          label="Valor (R$)"
          placeholder="Ex: 1500.50"
          value={valor}
          onChange={(e) =>
            setValor(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))
          }
          onBlur={() => handleBlur('valor')}
          error={valorError ? 'Valor deve ser maior que zero.' : undefined}
          min={0.01}
          step={0.01}
          icon={<DollarSign className="text-gray-500 dark:text-gray-400" size={16} />}
          disabled={loading}
          required
          aria-invalid={!!valorError}
          aria-describedby={valorError ? 'valor-error' : undefined}
        />

        <Input
          id="dataCompra"
          type="date"
          label="Data de Compra"
          value={dataCompraStr}
          onChange={(e) => {
            const dateValue = e.target.value ? new Date(e.target.value) : null;
            setDataCompra(dateValue);
          }}
          onBlur={() => handleBlur('dataCompra')}
          error={dataError ? 'Data de compra é obrigatória.' : undefined}
          icon={<Calendar className="text-gray-500 dark:text-gray-400" size={16} />}
          disabled={loading}
          required
          aria-invalid={!!dataError}
          aria-describedby={dataError ? 'dataCompra-error' : undefined}
        />

        <Button type="submit" disabled={!isFormValid || loading} loading={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Ativo'}
        </Button>

        {errorMessage && (
          <p
            id="form-error"
            className="text-red-600 text-sm mt-2"
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default AtivoForm;
