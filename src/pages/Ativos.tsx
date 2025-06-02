import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

type Ativo = {
  id: string
  nome: string
  tipo: string
  quantidade: number
  valorUnitario: number
}

const Ativos = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([])
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('Ação')
  const [quantidade, setQuantidade] = useState(0)
  const [valorUnitario, setValorUnitario] = useState(0)

  const ativosCollection = collection(db, 'ativos')

  const fetchAtivos = async () => {
    const data = await getDocs(ativosCollection)
    setAtivos(data.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Ativo, 'id'>) })))
  }

  useEffect(() => {
    fetchAtivos()
  }, [])

  const handleAddAtivo = async () => {
    if (!nome || quantidade <= 0 || valorUnitario <= 0) return

    await addDoc(ativosCollection, {
      nome,
      tipo,
      quantidade,
      valorUnitario,
    })

    setNome('')
    setQuantidade(0)
    setValorUnitario(0)
    setTipo('Ação')
    fetchAtivos()
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'ativos', id))
    fetchAtivos()
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Meus Ativos</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome do ativo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="border rounded px-3 py-2 mr-2"
        />
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="border rounded px-3 py-2 mr-2"
        >
          <option>Ação</option>
          <option>FII</option>
          <option>Criptomoeda</option>
          <option>Renda Fixa</option>
        </select>
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
          className="border rounded px-3 py-2 mr-2 w-24"
        />
        <input
          type="number"
          placeholder="Valor unitário"
          value={valorUnitario}
          onChange={e => setValorUnitario(Number(e.target.value))}
          className="border rounded px-3 py-2 mr-2 w-32"
        />
        <button
          onClick={handleAddAtivo}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Adicionar
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Quantidade</th>
            <th className="border border-gray-300 px-4 py-2">Valor Unitário (R$)</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ativos.map(ativo => (
            <tr key={ativo.id}>
              <td className="border border-gray-300 px-4 py-2">{ativo.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{ativo.tipo}</td>
              <td className="border border-gray-300 px-4 py-2">{ativo.quantidade}</td>
              <td className="border border-gray-300 px-4 py-2">{ativo.valorUnitario.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(ativo.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {ativos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Nenhum ativo cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default Ativos
