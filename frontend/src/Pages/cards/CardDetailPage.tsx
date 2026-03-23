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
        Número: **** **** **** {detail?.number?.slice(-4) || "0000"}
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
      <p>
        Cierre: {new Date(detail?.closingDate).toLocaleDateString()}
      </p>
      <p>
        Vence: {new Date(detail?.dueDate).toLocaleDateString()}
      </p>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-red-500 h-2 rounded"
          style={{ width: `${detail?.usagePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default CardDetailPage;

