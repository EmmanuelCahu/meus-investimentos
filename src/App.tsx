import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Ativos from './pages/Ativos'
import Recomendacoes from './pages/Recomendacoes'
import Mercado from './pages/Mercado'
import Educacao from './pages/Educacao'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ativos" element={<Ativos />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/educacao" element={<Educacao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
