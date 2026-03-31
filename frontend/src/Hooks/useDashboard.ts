import { useEffect, useState } from "react";
import { api } from "../Utils/api";


export const useDashboard = () => {
  const [account, setAccount] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [accountData, cardsData] = await Promise.all([
        api("/accounts/primary"),
        api("/card")
      ]);

      setAccount(accountData);
      setCards(cardsData);

    } catch (error) {
      console.error("Error dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    account,
    cards,
    loading,
    refetch: fetchDashboard // 👈 🔥 CLAVE
  };
};