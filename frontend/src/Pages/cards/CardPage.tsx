import { useCards } from "../../Hooks/useCard";

const CardsPage = () => {
  const { cards } = useCards();

  return (
    <div>
      <h1>Tarjetas</h1>
      {cards.map((card: any) => (
        <div key={card._id}>
          <p>{card.type}</p>
        </div>
      ))}
    </div>
  );
};


export default CardsPage;