import { useEffect, useState, useCallback } from "react";
import { api } from "../Utils/api";

export const useCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api("/card");
      setCards(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando tarjetas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards // 🔥 ACÁ ESTÁ LA CLAVE
  };
};