import { useCards } from "../../Hooks/useCard";
import CardItem from "../../Componentes/cards/CardItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CardsPage = () => {
  const { cards } = useCards();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filteredCards = cards.filter((c: any) => {
    if (filter === "all") return true;
    return c.type === filter;
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tarjetas</h1>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("credit")}>Crédito</button>
        <button onClick={() => setFilter("debit")}>Débito</button>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {filteredCards.map((card: any) => (
          <CardItem
            key={card._id}
            card={card}
            onClick={() => navigate(`/cards/${card._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;