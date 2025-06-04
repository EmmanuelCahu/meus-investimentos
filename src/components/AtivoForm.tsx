import React, { useState } from 'react';
import { tiposAtivo } from './types';
import { Calendar, DollarSign } from 'lucide-react';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface AtivoFormProps {
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  tipo: string;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  valor: number | '';
  setValor: React.Dispatch<React.SetStateAction<number | ''>>;
  dataCompra: Date;
  setDataCompra: React.Dispatch<React.SetStateAction<Date>>;
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

  const nomeError = touched.nome && nome.trim() === '';
  const tipoError = touched.tipo && tipo.trim() === '';
  const valorError = touched.valor && (valor === '' || (typeof valor === 'number' && valor <= 0));
  const dataError = touched.dataCompra && !dataCompra;

  const isFormValid = !nomeError && !tipoError && !valorError && !dataError;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <DollarSign className="mr-2 text-blue-500" size={20} />
        Novo Ativo
      </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          setTouched({ nome: true, tipo: true, valor: true, dataCompra: true });
          if (isFormValid && !loading) onSubmit();
        }}
        className="flex flex-col gap-4"
        noValidate
      >
        <Input
          id="nome"
          label="Nome do Ativo"
          placeholder="Ex: PETR4"
          value={nome}
          onChange={e => setNome(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
          error={nomeError ? 'Nome é obrigatório.' : undefined}
          autoComplete="off"
        />

        <Select
          id="tipo"
          label="Tipo de Ativo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, tipo: true }))}
          error={tipoError ? 'Tipo é obrigatório.' : undefined}
          options={[{ value: '', label: 'Selecione o tipo', disabled: true }].concat(
            tiposAtivo.map(opcao => ({ value: opcao, label: opcao }))
          )}
        />

        <Input
          id="valor"
          type="number"
          label="Valor (R$)"
          placeholder="Ex: 1500.50"
          value={valor}
          onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
          onBlur={() => setTouched(prev => ({ ...prev, valor: true }))}
          error={valorError ? 'Valor deve ser maior que zero.' : undefined}
          min={0}
          step={0.01}
          icon={<DollarSign className="text-gray-500 dark:text-gray-400" size={16} />}
        />

        <Input
          id="dataCompra"
          type="date"
          label="Data de Compra"
          value={dataCompra.toISOString().slice(0, 10)}
          onChange={e => setDataCompra(new Date(e.target.value))}
          onBlur={() => setTouched(prev => ({ ...prev, dataCompra: true }))}
          error={dataError ? 'Data de compra é obrigatória.' : undefined}
          icon={<Calendar className="text-gray-500 dark:text-gray-400" size={16} />}
        />

        <Button type="submit" disabled={!isFormValid || loading} loading={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Ativo'}
        </Button>

        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AtivoForm;
