import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Ativos from './pages/Ativos'
import Mercado from './pages/Mercado'
import Recomendacoes from './pages/Recomendacoes'
import Educacao from './pages/Educacao'

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ativos" element={<Ativos />} />
          <Route path="/mercado" element={<Mercado />} />
          <Route path="/recomendacoes" element={<Recomendacoes />} />
          <Route path="/educacao" element={<Educacao />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
