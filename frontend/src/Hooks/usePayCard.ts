import { useState } from "react";
import { api } from "../Utils/api";

export const usePayCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const payCard = async (cardId: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const data = await api(`/cards/${cardId}/pay`, {
        method: "POST",
        body: JSON.stringify({ amount })
      });

      setSuccess(data.message);

    } catch (err: any) {
      setError(err.message || "Error al pagar");
    } finally {
      setLoading(false);
    }
  };

  return { payCard, loading, error, success };
};