import { useCards } from "../../Hooks/useCard";
import CardItem from "../../Componentes/cards/CardItem";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../Utils/api";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";

const CardsPage = () => {
  const { cards, refetch } = useCards();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [accountId, setAccountId] = useState<string | null>(null);

  // ===============================
  // FETCH ACCOUNT
  // ===============================

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accounts = await api("/accounts");
        setAccountId(accounts[0]._id);
      } catch (err) {
        console.error("Error trayendo cuenta", err);
      }
    };

    fetchAccount();
  }, []);

  // ===============================
  // FILTER
  // ===============================

  const filteredCards = cards.filter((c: any) => {
    if (c.status === "cancelled") return false;
    if (filter === "all") return true;
    return c.type === filter;
  });

  // ===============================
  // ACTIONS
  // ===============================

  const handleRequestCard = async (type: "credit" | "debit") => {
    if (!accountId) {
      alert("Cuenta no disponible");
      return;
    }

    try {
      await api("/card/request", {
        method: "POST",
        body: JSON.stringify({
          type,
          accountId,
        }),
      });

      alert(`Tarjeta de ${type} creada`);
      refetch();
    } catch {
      alert("Error al crear tarjeta");
    }
  };

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="bg-main min-h-screen p-4 md:p-6 pb-20">
      <ButtomNavBar />

      <div className="max-w-3xl mx-auto space-y-4 mt-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">
            Tarjetas
          </h1>
        </div>

        {/* FILTROS */}
        <div className="bg-card rounded-2xl p-3 shadow-sm flex gap-2 justify-between">

          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-lg text-sm ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-main text-secondary-text"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("credit")}
            className={`flex-1 py-2 rounded-lg text-sm ${
              filter === "credit"
                ? "bg-primary text-white"
                : "bg-main text-secondary-text"
            }`}
          >
            Crédito
          </button>

          <button
            onClick={() => setFilter("debit")}
            className={`flex-1 py-2 rounded-lg text-sm ${
              filter === "debit"
                ? "bg-primary text-white"
                : "bg-main text-secondary-text"
            }`}
          >
            Débito
          </button>

        </div>

        {/* LISTA */}
        <div className="space-y-3">
          {filteredCards.length > 0 ? (
            filteredCards.map((card: any) => (
              <CardItem
                key={card._id}
                card={card}
                onClick={() => navigate(`/cards/${card._id}`)}
              />
            ))
          ) : (
            <div className="bg-card p-4 rounded-2xl text-center text-secondary-text">
              No tenés tarjetas
            </div>
          )}
        </div>

        {/* ACCIONES */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-3">

          <h2 className="text-sm font-medium text-primary">
            Solicitar tarjeta
          </h2>

          <div className="flex gap-2">

            <button
              onClick={() => handleRequestCard("credit")}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium"
            >
              + Crédito
            </button>

            <button
              onClick={() => handleRequestCard("debit")}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
            >
              + Débito
            </button>

          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default CardsPage;