import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ativos from './pages/Ativos'
import Mercado from './pages/Mercado'
import Recomendacoes from './pages/Recomendacoes'
import Educacao from './pages/Educacao'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ativos" element={<Ativos />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/educacao" element={<Educacao />} />
      </Routes>
    </div>
  )
}

export default App