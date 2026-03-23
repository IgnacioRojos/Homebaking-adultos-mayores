type Props = {
  card: any;
  onClick: () => void;
};

const CardItem = ({ card, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow cursor-pointer"
    >
      <p>Tarjeta {card.lastFour}</p>
      <p className="text-sm text-gray-500">{card.type}</p>
    </div>
  );
};

export default CardItem;