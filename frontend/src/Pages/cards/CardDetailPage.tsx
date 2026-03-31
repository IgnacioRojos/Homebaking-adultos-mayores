import { useParams, useNavigate } from "react-router-dom";
import { useCardDetail } from "../../Hooks/useCardDetail";
import { api } from "../../Utils/api";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";

const CardDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { detail, loading, error, refetch, hasDebt, hasBalance } =
    useCardDetail(_id);

  // ===============================
  // FORMATTERS
  // ===============================

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-AR").format(new Date(date));
  };

  // ===============================
  // ACTIONS
  // ===============================

  const handlePay = async () => {
    const amount = prompt("Ingrese monto a pagar:");
    if (!amount) return;

    try {
      await api(`/card/${_id}/pay`, {
        method: "POST",
        body: JSON.stringify({ amount: Number(amount) }),
      });

      alert("Pago realizado");
      refetch();
    } catch {
      alert("Error al pagar");
    }
  };

  const handleEnable = async () => {
    try {
      await api(`/card/${_id}/enable`, {
        method: "PATCH",
      });

      alert("Tarjeta activada");
      refetch();
    } catch {
      alert("Error al activar");
    }
  };

  const handleDeactivate = async () => {
    const confirmDelete = confirm(
      "¿Seguro que querés dar de baja la tarjeta?"
    );
    if (!confirmDelete) return;

    try {
      await api(`/card/${_id}`, {
        method: "DELETE",
      });

      alert("Tarjeta dada de baja");
      refetch();
      navigate("/cards");
    } catch {
      alert("Error al dar de baja");
    }
  };

  // ===============================
  // UI STATES
  // ===============================

  if (loading)
    return <p className="p-4 text-secondary-text">Cargando...</p>;

  if (error)
    return <p className="p-4 text-red-500">{error}</p>;

  if (!detail)
    return <p className="p-4 text-secondary-text">No hay datos</p>;

  const isLimitExceeded =
    detail.type === "credit" && (detail.availableLimit ?? 0) <= 0;

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="bg-main min-h-screen p-4 md:p-6 pb-20">
      <ButtomNavBar />

      <div className="max-w-3xl mx-auto space-y-4 mt-4">

        {/* HEADER */}
        <div className="bg-card rounded-2xl p-5 shadow-sm space-y-2">
          <h1 className="text-xl font-bold text-primary">
            Tarjeta **** {detail.number.slice(-4)}
          </h1>

          <p className="text-secondary-text text-sm">
            {detail.type === "credit" ? "Crédito" : "Débito"}
          </p>

          <p className="text-secondary-text text-sm">
            Estado: {detail.status}
          </p>
        </div>

        {/* INFO */}
        <div className="bg-card rounded-2xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-primary">Información</h2>

          {detail.type === "credit" && (
            <>
              <p>Límite: {formatCurrency(detail.creditLimit ?? 0)}</p>
              <p>Disponible: {formatCurrency(detail.availableLimit ?? 0)}</p>
              <p>Consumido: {formatCurrency(detail.consumed ?? 0)}</p>

              {isLimitExceeded && (
                <p className="text-red-500 font-medium">
                  Límite agotado
                </p>
              )}

              <p>
                {hasDebt
                  ? `A pagar: ${formatCurrency(detail.amountToPay)}`
                  : "No tenés deuda"}
              </p>
            </>
          )}

          {detail.type === "debit" && (
            <>
              <p>Saldo: {formatCurrency(detail.balance ?? 0)}</p>

              {!hasBalance && (
                <p className="text-red-500 font-medium">
                  Sin saldo disponible
                </p>
              )}
            </>
          )}
        </div>

        {/* MOVIMIENTOS */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-primary mb-3">
            Movimientos
          </h2>

          {detail.movements?.length > 0 ? (
            <div className="space-y-2">
              {detail.movements.map((mov: any) => (
                <div
                  key={mov._id}
                  className="flex justify-between items-center bg-main p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-primary">
                      {mov.description || mov.type}
                    </p>
                    <p className="text-xs text-secondary-text">
                      {formatDate(mov.date)}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      mov.type === "CARD_PURCHASE"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {mov.type === "CARD_PURCHASE" ? "-" : "+"}
                    {formatCurrency(mov.amount)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-text text-sm">
              No hay movimientos
            </p>
          )}
        </div>

        {/* ÚLTIMO PAGO */}
        {detail.type === "credit" && (
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-primary mb-2">
              Último pago
            </h2>

            {detail.lastPayment ? (
              <>
                <p>
                  Monto:{" "}
                  {formatCurrency(detail.lastPayment.amount)}
                </p>
                <p className="text-sm text-secondary-text">
                  {formatDate(detail.lastPayment.date)}
                </p>
              </>
            ) : (
              <p className="text-secondary-text text-sm">
                No hay pagos registrados
              </p>
            )}
          </div>
        )}

        {/* ACCIONES */}
        <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col gap-3">

          {detail.type === "credit" && (
            <button
              onClick={handlePay}
              className="bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
            >
              Pagar tarjeta
            </button>
          )}

          {detail.status !== "active" && (
            <button
              onClick={handleEnable}
              className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium"
            >
              Activar tarjeta
            </button>
          )}

          <button
            onClick={handleDeactivate}
            className="bg-red-500 text-white py-2 rounded-lg text-sm font-medium"
          >
            Dar de baja
          </button>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default CardDetailPage;