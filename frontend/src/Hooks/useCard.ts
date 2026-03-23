import { useEffect, useState } from "react";
import { api } from "../Utils/api";

export const useCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await api("/card");
      console.log("CARDS:", data);
      setCards(data);
    };

    fetchCards();
  }, []);

  return { cards };
};