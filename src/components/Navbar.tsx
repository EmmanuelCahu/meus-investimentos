import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/ativos" className="hover:underline">Ativos</Link>
      <Link to="/mercado" className="hover:underline">Mercado</Link>
      <Link to="/recomendacoes" className="hover:underline">Recomendações</Link>
      <Link to="/educacao" className="hover:underline">Educação</Link>
    </nav>
  )
}
