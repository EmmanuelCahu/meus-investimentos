import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import { Ativo } from "@/types/Ativo";

type DistribuicaoTipo = { tipo: string; valor: number };
type HistoricoPatrimonio = { mes: string; valor: number };

export function useAtivosData() {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAtivos = async () => {
      try {
        const ativosCollection = collection(db, "ativos");
        const ativosSnapshot = await getDocs(ativosCollection);
        const ativosList = ativosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Ativo[];
        setAtivos(ativosList);
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtivos();
  }, []);

  const totalInvestido = ativos.reduce((acc, ativo) => acc + (ativo.valorInvestido ?? 0), 0);

  const totalRentabilidade =
    totalInvestido > 0
      ? ativos.reduce(
          (acc, ativo) => acc + ((ativo.valorInvestido ?? 0) * (ativo.rentabilidade ?? 0)) / totalInvestido,
          0
        )
      : 0;

  const tipoMap = new Map<string, number>();
  ativos.forEach((ativo) => {
    const tipo = ativo.tipo ?? "Outro";
    const valor = ativo.valorInvestido ?? 0;
    tipoMap.set(tipo, (tipoMap.get(tipo) ?? 0) + valor);
  });

  const distribuicaoPorTipo: DistribuicaoTipo[] = [];
  tipoMap.forEach((valor, tipo) => {
    distribuicaoPorTipo.push({ tipo, valor });
  });

  // Exemplo simples de histórico de patrimônio (substituir conforme necessidade)
  const historicoPatrimonio: HistoricoPatrimonio[] = [
    { mes: "Jan", valor: totalInvestido * 0.9 },
    { mes: "Fev", valor: totalInvestido * 0.95 },
    { mes: "Mar", valor: totalInvestido },
  ];

  return {
    ativos,
    loading,
    totalInvestido,
    totalRentabilidade,
    distribuicaoPorTipo,
    historicoPatrimonio,
  };
}
