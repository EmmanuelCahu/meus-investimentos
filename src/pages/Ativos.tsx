import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Ativo } from '../components/types';
import AtivoForm from '../components/AtivoForm';
import Filters from '../components/Filters';
import PaginatedTable from '../components/PaginatedTable';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const ITEMS_PER_PAGE = 5;

const Ativos: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filtragem e paginação
  const [filterNome, setFilterNome] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAtivos = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const snapshot = await getDocs(collection(db, 'ativos'));
      const data: Ativo[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Ativo, 'id'>),
      }));
      setAtivos(data);
    } catch (error) {
      setErrorMessage('Erro ao buscar ativos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAtivos();
  }, [fetchAtivos]);

  const handleAddAtivo = async (novoAtivo: Omit<Ativo, 'id'>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'ativos'), novoAtivo);
      setToastMessage('Ativo adicionado com sucesso!');
      fetchAtivos();
    } catch (error) {
      setErrorMessage('Erro ao adicionar ativo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteAtivo = async () => {
    if (!deleteId) return;
    try {
      setLoading(true);
      setErrorMessage(null);
      await deleteDoc(doc(db, 'ativos', deleteId));
      setDeleteId(null);
      setToastMessage('Ativo excluído com sucesso!');
      fetchAtivos();
    } catch (error) {
      setErrorMessage('Erro ao excluir ativo. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar ativos de acordo com nome e tipo
  const filteredAtivos = ativos.filter(ativo => {
    const matchNome = ativo.nome.toLowerCase().includes(filterNome.toLowerCase());
    const matchTipo = filterTipo ? ativo.tipo === filterTipo : true;
    return matchNome && matchTipo;
  });

  // Paginação
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAtivos = filteredAtivos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredAtivos.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Ativos</h1>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">{errorMessage}</div>
      )}

      <AtivoFormWrapper onAddAtivo={handleAddAtivo} loading={loading} errorMessage={errorMessage} />

      <Filters
        filterNome={filterNome}
        setFilterNome={setFilterNome}
        filterTipo={filterTipo}
        setFilterTipo={setFilterTipo}
      />

      {loading && <p className="my-4">Carregando ativos...</p>}

      {!loading && paginatedAtivos.length === 0 && (
        <p className="my-4 text-gray-600">Nenhum ativo encontrado.</p>
      )}

      <PaginatedTable
        data={paginatedAtivos}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDelete={setDeleteId}
      />

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDeleteAtivo}
        title="Excluir Ativo"
        message="Tem certeza que deseja excluir este ativo?"
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

interface AtivoFormWrapperProps {
  onAddAtivo: (novoAtivo: Omit<Ativo, 'id'>) => void;
  loading: boolean;
  errorMessage: string | null;
}

const AtivoFormWrapper: React.FC<AtivoFormWrapperProps> = ({ onAddAtivo, loading, errorMessage }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState<number | ''>('');
  const [dataCompra, setDataCompra] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (nome.trim() === '' || tipo.trim() === '' || valor === '' || valor <= 0) return;
    onAddAtivo({ nome, tipo, valor: Number(valor), dataCompra });
    // Reset form
    setNome('');
    setTipo('');
    setValor('');
    setDataCompra(new Date());
  };

  return (
    <AtivoForm
      nome={nome}
      setNome={setNome}
      tipo={tipo}
      setTipo={setTipo}
      valor={valor}
      setValor={setValor}
      dataCompra={dataCompra}
      setDataCompra={setDataCompra}
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

export default Ativos;
