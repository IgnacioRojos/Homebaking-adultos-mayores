type Props = {
  card: any;
  onClick: () => void;
};

const CardItem = ({ card, onClick }: Props) => {


  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm flex justify-between items-center">

      {/* INFO */}
      <div>
        <p className="font-semibold text-primary">
          Tarjeta **** {card.cardNumber.slice(-4)}
        </p>

        <p className="text-sm text-secondary-text">
          {card.type === "credit" ? "Crédito" : "Débito"}
        </p>

        <p className="text-xs text-secondary-text">
          Estado: {card.status === "active" ? "Activa" : "Inactiva"}
        </p>
      </div>

      {/*TENGO QUE VER LOS ULTIMOS CUATRO DIGITOS*/} 

      {/* BOTÓN */}
      <button
        onClick={onClick}
        className=  "bg-primary cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
      >
        Ver
      </button>

    </div>
  );
};

export default CardItem;