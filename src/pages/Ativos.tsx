// src/pages/Ativos.tsx

import React, { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Ativo } from '../components/types'
import AtivoForm from '../components/AtivoForm'
import Filters from '../components/Filters'
import PaginatedTable from '../components/PaginatedTable'
import ConfirmModal from '../components/ConfirmModal'  // <-- aqui
import Toast from '../components/Toast'

const ITEMS_PER_PAGE = 5

const Ativos: React.FC = () => {
  // ... estados e lógica omitidos para brevidade ...

  // Confirma exclusão de um ativo
  const confirmDeleteAtivo = async () => {
    if (!deleteId) return

    try {
      setLoading(true)
      setErrorMessage(null)
      await deleteDoc(doc(db, 'ativos', deleteId))
      setDeleteId(null)
      setToastMessage('Ativo excluído com sucesso!')
      fetchAtivos()
    } catch (error) {
      setErrorMessage('Erro ao excluir ativo. Tente novamente.')
      console.error('confirmDeleteAtivo error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ... restante do JSX ... */}

      {/* Chamando o ConfirmModal que você já tem */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Confirmação de exclusão"
        message="Tem certeza que deseja excluir este ativo?"
        onConfirm={confirmDeleteAtivo}
        onCancel={() => setDeleteId(null)}
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  )
}

export default Ativos
