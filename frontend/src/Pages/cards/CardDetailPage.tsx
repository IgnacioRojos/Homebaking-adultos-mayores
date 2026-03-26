import { useParams } from "react-router-dom";
import { useCardDetail } from "../../Hooks/useCardDetail";
import { api } from "../../Utils/api";

const CardDetailPage = () => {
  const { _id } = useParams();

  const { detail, loading, error, refetch } = useCardDetail(_id);

  // ===============================
  // ACCIONES
  // ===============================

  const handlePay = async () => {
    const amount = prompt("Ingrese monto a pagar:");

    if (!amount) return;

    try {
      await api(`/card/${_id}/pay`, {
        method: "POST",
        body: JSON.stringify({ amount: Number(amount) })
      });

      alert("Pago realizado");
      refetch();
    } catch (err) {
      alert("Error al pagar");
    }
  };

  const handleEnable = async () => {
    try {
      await api(`/card/${_id}/enable`, {
        method: "PATCH"
      });

      alert("Tarjeta activada");
      refetch();
    } catch (err) {
      alert("Error al activar");
    }
  };

  const handleDeactivate = async () => {
    const confirmDelete = confirm("¿Seguro que querés dar de baja la tarjeta?");

    if (!confirmDelete) return;

    try {
      await api(`/card/${_id}`, {
        method: "DELETE"
      });

      alert("Tarjeta dada de baja");
      refetch();
    } catch (err) {
      alert("Error al dar de baja");
    }
  };

  // ===============================
  // UI STATES
  // ===============================

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!detail) return <p>No hay datos</p>;

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-xl font-bold">
        Tarjeta {detail.number}
      </h1>

      <p>Tipo: {detail.type}</p>
      <p>Estado: {detail.status}</p>

      {/* CREDIT */}
      {detail.type === "credit" && (
        <>
          <p>Límite: {detail.creditLimit}</p>
          <p>Disponible: {detail.availableLimit}</p>
          <p>Consumido: {detail.consumed}</p>
          <p>A pagar: {detail.amountToPay}</p>
        </>
      )}

      {/* DEBIT */}
      {detail.type === "debit" && (
        <p>Balance: {detail.balance}</p>
      )}

      {/* ===============================
          BOTONES
      =============================== */}

      <div className="flex gap-3 mt-4">

        {/* PAGAR */}
        {detail.type === "credit" && (
          <button
            onClick={handlePay}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Pagar
          </button>
        )}

        {/* ACTIVAR */}
        {detail.status !== "active" && (
          <button
            onClick={handleEnable}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Activar
          </button>
        )}

        {/* BAJA */}
        <button
          onClick={handleDeactivate}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Dar de baja
        </button>

      </div>

    </div>
  );
};

export default CardDetailPage;

/*import { useParams } from "react-router-dom";
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
      {/* cardNumber existe y es string, usamos slice */
     /* <p className="font-semibold">
        Número: **** **** **** {detail?.number?.slice(-4) || "0000"}
      </p>

      {/* Como no hay expirationDate, usamos updatedAt o una fecha estimada */
     /* <p className="text-gray-600 text-sm">
        Estado: <span className="text-green-500 font-bold">{detail?.status}</span>
      </p>
      
      <p className="text-gray-600 text-sm">
        Límite Disponible: ${detail?.availableLimit?.toLocaleString()}
      </p>

      <p>
        Cierre: {new Date(detail?.closingDate).toLocaleDateString()}
      </p>

      <p>
        Vence: {new Date(detail?.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CardDetailPage;*/
