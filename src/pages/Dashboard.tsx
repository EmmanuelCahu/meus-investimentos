import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useAtivosData } from "@/hooks/useAtivosData";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#0088FE", "#00C49F"];

const Dashboard: React.FC = () => {
  const {
    ativos,
    loading,
    totalInvestido,
    totalRentabilidade,
    distribuicaoPorTipo,
    historicoPatrimonio,
  } = useAtivosData();

  if (loading) {
    return <div className="p-4">Carregando dados...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Visão Geral</h1>

      {/* Cards com resumos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Total Investido</p>
            <p className="text-xl font-bold">R$ {totalInvestido.toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Rentabilidade Total</p>
            <p className="text-xl font-bold text-green-600">{totalRentabilidade.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Nº de Ativos</p>
            <p className="text-xl font-bold">{ativos.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por tipo de ativo */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Distribuição da Carteira</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={distribuicaoPorTipo}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {distribuicaoPorTipo.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Evolução do patrimônio */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Evolução do Patrimônio</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicoPatrimonio}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
            <Legend />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ranking de ativos */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Ranking de Rentabilidade</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[...ativos].sort((a, b) => b.rentabilidade - a.rentabilidade).slice(0, 5)}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
            <Bar dataKey="rentabilidade" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
