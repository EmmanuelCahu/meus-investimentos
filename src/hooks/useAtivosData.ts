import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase"; // aponta para src/firebase/config.ts
import { Ativo } from "@/types/Ativo";

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

  return { ativos, loading };
}
