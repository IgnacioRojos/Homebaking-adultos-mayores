import { useEffect, useState } from "react";
import { api } from "../Utils/api";

export const useCardDetail = (_id: string | undefined) => { // Acepta undefined
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Tip: agrega un estado de carga
  const [error, setError] = useState<string | null>(null);


    const fetchDetail = async () => {
    if (!_id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api(`/card/${_id}/details`);
      setDetail(data);
    } catch (err) {
      console.error("Error cargando detalle:", err);
      setError("No se pudo cargar la tarjeta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [_id]);

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail // 🔥 clave para acciones
  };
};



