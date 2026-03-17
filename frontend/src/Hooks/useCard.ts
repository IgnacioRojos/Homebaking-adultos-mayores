import { useEffect, useState } from "react";
import { api } from "../Utils/api";

export const useCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await api("/api/card");
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  return { cards };
};