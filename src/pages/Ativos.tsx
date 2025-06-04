// src/pages/Ativos.tsx
import React from 'react'
import { AtivosProvider } from '../context/AtivosContext'
import AtivoForm from '../components/AtivoForm'
import AtivosList from '../components/AtivosList'

const AtivosPage: React.FC = () => {
  return (
    <AtivosProvider>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Meus Ativos</h1>
        <AtivoForm />
        <AtivosList />
      </main>
    </AtivosProvider>
  )
}

export default AtivosPage
