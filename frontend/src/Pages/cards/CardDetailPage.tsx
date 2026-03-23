import { useParams } from "react-router-dom";
import { useCardDetail } from "../../Hooks/useCardDetail";

const CardDetailPage = () => {
  const { _id } = useParams();
  
  // Pasamos el id y desestructuramos también un posible error o estado de carga
  
  const { detail } = useCardDetail(_id);

  // 1. Primero validamos si el ID existe en la URL
  if (!_id) return <div className="p-4 text-red-500">Error: No se proporcionó un ID de tarjeta.</div>;

  // 2. Luego validamos si aún no hay datos
  if (!detail) return <div className="p-4 text-gray-500">Cargando detalles de la tarjeta...</div>;
  console.log("DEBUG DETAIL:", detail);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* cardNumber existe y es string, usamos slice */}
      <p className="font-semibold">
        Número: **** **** **** {detail?.cardNumber?.slice(-4) || "0000"}
      </p>

      {/* Como no hay expirationDate, usamos updatedAt o una fecha estimada */}
      <p className="text-gray-600 text-sm">
        Estado: <span className="text-green-500 font-bold">{detail?.status}</span>
      </p>
      
      <p className="text-gray-600 text-sm">
        Límite Disponible: ${detail?.availableLimit?.toLocaleString()}
      </p>

      {/* Si el backend no envía vencimiento, podrías mostrar la fecha de creación */}
      <p className="text-gray-500 text-xs mt-2">
        Emitida el: {new Date(detail?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CardDetailPage;


/*import { useParams } from "react-router-dom";
import { useCardDetail } from "../../Hooks/useCardDetail";

const CardDetailPage = () => {
  const { id } = useParams();
  const { detail } = useCardDetail(id!);

  if (!detail) return <p>Cargando...</p>;
  if (!id) return <p>Error: ID no válido</p>;



  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        Tarjeta de {detail.type}
      </h1>

      {/* INFO */
     /* <div className="bg-white p-4 rounded-xl shadow">
        <p>Número: {detail.number}</p>
        <p>Vencimiento: {detail.expirationDate}</p>
        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
          Pagar
        </button>
      </div>

      {/* MOVIMIENTOS */
     /* <div className="bg-white p-4 rounded-xl shadow">
        <h2>Últimos movimientos</h2>
      </div>

      {/* PAGOS */
     /* <div className="bg-white p-4 rounded-xl shadow">
        <h2>Últimos pagos</h2>
      </div>
    </div>
  );
};

export default CardDetailPage;*/