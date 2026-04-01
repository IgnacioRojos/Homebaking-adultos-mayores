import { useNavigate } from "react-router-dom";

type Props = {
  card?: any;
};

const DebitCardPreview = ({ card }: Props) => {
  const navigate = useNavigate();

  if (!card) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p>No tenés tarjeta</p>
      </div>
    );
  }

  const lastFour = card.cardNumber?.slice(-4);

  return (
    <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

      <p className="text-white">Tarjeta de débito</p>

      <h2 className="text-xl font-bold mt-2">
        **** {lastFour}
      </h2>

      <button 
        onClick={() => navigate("/cards")}
        className="bg-white/20 backdrop-blur-sm text-white text-s font-semibold px-3 py-1 rounded-full border border-white/30"
      >
        Ver Tarjetas
      </button>

    </div>
  );

};

export default DebitCardPreview;