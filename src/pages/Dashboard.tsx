import React from "react";
import { ArrowUpRight, TrendingUp, BarChart3, DollarSign } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Visão Geral da Carteira</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Investido</p>
            <p className="text-xl font-semibold text-gray-800">R$ 45.320,00</p>
          </div>
          <DollarSign className="text-green-600 w-6 h-6" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Rentabilidade (12 meses)</p>
            <p className="text-xl font-semibold text-gray-800">+14,2%</p>
          </div>
          <TrendingUp className="text-blue-600 w-6 h-6" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Rendimento Mensal</p>
            <p className="text-xl font-semibold text-gray-800">R$ 724,00</p>
          </div>
          <ArrowUpRight className="text-purple-600 w-6 h-6" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Objetivo de Renda</p>
            <p className="text-xl font-semibold text-gray-800">18% atingido</p>
          </div>
          <BarChart3 className="text-orange-600 w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo dos Ativos</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>- 45% em Fundos Imobiliários (FIIs)</li>
          <li>- 30% em Ações de Dividendos</li>
          <li>- 15% em Renda Fixa</li>
          <li>- 10% em Criptomoedas</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Progresso para Independência Financeira</h2>
        <p className="text-sm text-gray-600 mb-4">
          Seu objetivo é viver de renda com R$ 5.000/mês. Atualmente, sua carteira gera R$ 724/mês.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-full rounded-full" style={{ width: "14.48%" }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">14,5% do objetivo alcançado</p>
      </div>
    </div>
  );
};

export default Dashboard;
