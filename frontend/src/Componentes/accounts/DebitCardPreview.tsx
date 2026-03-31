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
    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-gray-500">Tarjeta de débito</p>

      <h2 className="text-xl font-bold mt-2">
        **** {lastFour}
      </h2>

      <button 
        onClick={() => navigate("/cards")}
        className="mt-4 text-blue-600"
      >
        Ver detalle
      </button>

    </div>
  );

};

export default DebitCardPreview;