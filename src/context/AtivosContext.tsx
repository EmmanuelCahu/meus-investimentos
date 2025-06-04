// src/context/AtivosContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

export interface Ativo {
  id: string
  nome: string
  tipo: string
  valor: number
}

interface AtivosContextType {
  ativos: Ativo[]
  loading: boolean
  error: string | null
  fetchAtivos: () => Promise<void>
  addAtivo: (ativo: Omit<Ativo, 'id'>) => Promise<void>
  deleteAtivo: (id: string) => Promise<void>
}

const AtivosContext = createContext<AtivosContextType | undefined>(undefined)

export const useAtivos = () => {
  const context = useContext(AtivosContext)
  if (!context) {
    throw new Error('useAtivos must be used within AtivosProvider')
  }
  return context
}

export const AtivosProvider = ({ children }: { children: ReactNode }) => {
  const [ativos, setAtivos] = useState<Ativo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ativosCollection = collection(db, 'ativos')

  const fetchAtivos = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getDocs(ativosCollection)
      setAtivos(data.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ativo[])
    } catch (err) {
      setError('Erro ao carregar ativos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addAtivo = async (ativo: Omit<Ativo, 'id'>) => {
    setLoading(true)
    setError(null)
    try {
      await addDoc(ativosCollection, ativo)
      await fetchAtivos()
    } catch (err) {
      setError('Erro ao adicionar ativo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteAtivo = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await deleteDoc(doc(db, 'ativos', id))
      await fetchAtivos()
    } catch (err) {
      setError('Erro ao excluir ativo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAtivos()
  }, [])

  return (
    <AtivosContext.Provider value={{ ativos, loading, error, fetchAtivos, addAtivo, deleteAtivo }}>
      {children}
    </AtivosContext.Provider>
  )
}
