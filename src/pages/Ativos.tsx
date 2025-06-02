import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

interface Ativo {
  id: string
  nome: string
  tipo: string
  valor: number
}

const Ativos: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([])
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState<number | ''>('')

  const ativosCollection = collection(db, 'ativos')

  const fetchAtivos = async () => {
    const data = await getDocs(ativosCollection)
    setAtivos(data.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ativo[])
  }

  useEffect(() => {
    fetchAtivos()
  }, [])

  const handleAddAtivo = async () => {
    if (!nome || !tipo || valor === '') return
    await addDoc(ativosCollection, { nome, tipo, valor: Number(valor) })
    setNome('')
    setTipo('')
    setValor('')
    fetchAtivos()
  }

  const handleDeleteAtivo = async (id: string) => {
    await deleteDoc(doc(db, 'ativos', id))
    fetchAtivos()
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ativos</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddAtivo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <ul>
        {ativos.map(ativo => (
          <li key={ativo.id} className="flex justify-between border-b py-2">
            <span>{ativo.nome} - {ativo.tipo} - R$ {ativo.valor.toFixed(2)}</span>
            <button
              onClick={() => handleDeleteAtivo(ativo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Ativos
