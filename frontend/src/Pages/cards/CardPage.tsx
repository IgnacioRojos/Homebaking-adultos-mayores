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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [createdType, setCreatedType] = useState<"credit" | "debit" | null>(null);

  // ===============================
  // FETCH ACCOUNT
  // ===============================
  useEffect(() => {
    if (showSuccessModal || showErrorModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, showErrorModal]);

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
      setShowErrorModal(true);
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

      setCreatedType(type);
      setShowSuccessModal(true);
      refetch();
    } catch {
      setShowErrorModal(true);
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
            className={`flex-1 py-2 rounded-full text-sm ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-main text-secondary-text"
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("credit")}
            className={`flex-1 py-2 rounded-full text-sm ${
              filter === "credit"
                ? "bg-primary text-white"
                : "bg-main text-secondary-text"
            }`}
          >
            Crédito
          </button>

          <button
            onClick={() => setFilter("debit")}
            className={`flex-1 py-2 rounded-full text-sm ${
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
              className="flex-1 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold border border-white/30 backdrop-blur-sm hover:opacity-90 transition"
            >
              + Crédito
            </button>

            <button
              onClick={() => handleRequestCard("debit")}
              className="flex-1 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold border border-white/30 backdrop-blur-sm hover:opacity-90 transition"
            >
              + Débito
            </button>
      

          </div>
        </div>

      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4 text-center animate-fadeIn">

            <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              Tarjeta creada
            </h2>

            <p className="text-sm text-gray-500">
              Tu tarjeta de{" "}
              <span className="font-medium">
                {createdType === "credit" ? "crédito" : "débito"}
              </span>{" "}
              está lista.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2 rounded-full bg-primary text-white font-medium"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4 text-center animate-fadeIn">

            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-2xl">✕</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              Ocurrió un error
            </h2>

            <p className="text-sm text-gray-500">
              No pudimos crear la tarjeta. Intentá nuevamente.
            </p>

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default CardsPage;