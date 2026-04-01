type Props = {
  card: any;
  onClick: () => void;
};

const CardItem = ({ card, onClick }: Props) => {


  return (
    <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

      {/* INFO */}
      <div>
        <p className="font-semibold text-white">
          Tarjeta **** {card.cardNumber.slice(-4)}
        </p>

        <p className="text-sm text-white-500">
          {card.type === "credit" ? "Crédito" : "Débito"}
        </p>

        <p className="text-xs text-white-500">
          Estado: {card.status === "active" ? "Activa" : "Inactiva"}
        </p>
      </div>


      {/* BOTÓN */}
        <button
          onClick={onClick}
          className=  "bg-white/20 backdrop-blur-sm text-white text-xl font-semibold px-3 py-1 rounded-full border border-white/30"
        >
          Ver
        </button>

    </div>
  );
};

export default CardItem;