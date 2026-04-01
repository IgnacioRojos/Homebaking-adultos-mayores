import { useParams, useNavigate } from "react-router-dom";
import { useCardDetail } from "../../Hooks/useCardDetail";
import { api } from "../../Utils/api";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const CardDetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  // MODALS
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);

  const deleteModalRef = useRef<HTMLDivElement>(null);
  const enableModalRef = useRef<HTMLDivElement>(null);

  // STATES
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEnable, setLoadingEnable] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const { detail, loading, error, refetch, hasDebt, hasBalance } =
    useCardDetail(_id);

  // ===============================
  // CLICK OUTSIDE (DELETE)
  // ===============================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        deleteModalRef.current &&
        !deleteModalRef.current.contains(e.target as Node)
      ) {
        setShowDeleteModal(false);
      }
    };

    if (showDeleteModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteModal]);

  // ===============================
  // CLICK OUTSIDE (ENABLE)
  // ===============================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        enableModalRef.current &&
        !enableModalRef.current.contains(e.target as Node)
      ) {
        setShowEnableModal(false);
      }
    };

    if (showEnableModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEnableModal]);

  // ===============================
  // AUTO HIDE SENSITIVE DATA
  // ===============================
  useEffect(() => {
    if (showSensitiveData) {
      const timer = setTimeout(() => {
        setShowSensitiveData(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showSensitiveData]);

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

  const formatExpiry = (date: string) => {
    const d = new Date(date);
    return `${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear().toString().slice(-2)}`;
  };

  // ===============================
  // ACTIONS
  // ===============================
  const handleEnable = async () => {
    try {
      setLoadingEnable(true);

      await api(`/card/${_id}/enable`, {
        method: "PATCH",
      });

      setShowEnableModal(false);
      await refetch();
    } catch {
      setLoadingEnable(false);
    } finally {
      setLoadingEnable(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      setLoadingDelete(true);

      await api(`/card/${_id}`, {
        method: "DELETE",
      });

      setShowDeleteModal(false);
      navigate("/cards");
    } catch {
      setLoadingDelete(false);
    }
  };

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

  // ===============================
  // UI STATES
  // ===============================
  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!detail) return <p className="p-4">No hay datos</p>;

  const isLimitExceeded =
    detail.type === "credit" && (detail.availableLimit ?? 0) <= 0;

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="bg-main min-h-screen p-4 pb-20">
      <ButtomNavBar />

      <div className="max-w-3xl mx-auto space-y-4 mt-4">

        {/* CARD DATA */}
        <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-white">
              Datos de la tarjeta
            </h2>

            <button onClick={() => setShowSensitiveData(prev => !prev)}>
              {showSensitiveData ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <p>
            Número:{" "}
            {showSensitiveData
              ? detail.number
              : "**** **** **** " + detail.number.slice(-4)}
          </p>

          <p>
            Vencimiento:{" "}
            {showSensitiveData
              ? formatExpiry(detail.closingDate)
              : "**/**"}
          </p>

          <p>
            CVV: {showSensitiveData ? detail.cvv : "***"}
          </p>

          <p className="text-sm text-white">
            {detail.type === "credit" ? "Crédito" : "Débito"}
          </p>

          <p className="text-sm text-white">
            Estado: {detail.status === "active" ? "Activa" : "Inactiva"}
          </p>
        </div>

        {/* INFO */}
        <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">
          <h2 className="font-semibold">Información</h2>

          {detail.type === "credit" && (
            <>
             <p>Límite: {formatCurrency(detail.creditLimit ?? 0)}</p>
             <p>Disponible: {formatCurrency(detail.availableLimit ?? 0)}</p>
             <p>Consumido: {formatCurrency(detail.consumed ?? 0)}</p>

              {isLimitExceeded && (
                <p className="text-red-500">Límite agotado</p>
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
                <p className="text-red-500">Sin saldo</p>
              )}
            </>
          )}
        </div>

        {/* ACTIONS */}
        <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col gap-3">

          {detail.type === "credit" && (
            <button
              onClick={handlePay}
              className="px-4 py-2 rounded-lg bg-purple-600  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30"
            >
              Pagar tarjeta
            </button>
          )}

          {detail.status !== "active" && (
            <button
              onClick={() => setShowEnableModal(true)}
              className="px-4 py-2 rounded-lg bg-purple-600  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30"
            >
              Activar tarjeta
            </button>
          )}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 rounded-lg bg-red-500  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30"
          >
            Dar de baja
          </button>
        </div>

      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div
            ref={deleteModalRef}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4 animate-fadeIn"
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">
                ¿Eliminar tarjeta?
              </h2>
              <p className="text-sm text-gray-500">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2  border-gray-300 text-gray-700 font-medium bg-gray-100 transition rounded-full"
              >
                Cancelar
              </button>

              <button
                onClick={handleDeactivate}
                className="flex-1 bg-red-600 transition  backdrop-blur-sm text-white font-medium  px-3 py-1 rounded-full border border-white/30"
                disabled={loadingDelete}
              >
                {loadingDelete ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENABLE MODAL */}
      {showEnableModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div
            ref={enableModalRef}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4 animate-fadeIn"
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">
                ¿Activar tarjeta?
              </h2>
              <p className="text-sm text-gray-500">
                Podrás usarla inmediatamente.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEnableModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleEnable}
                className="flex-1 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition disabled:opacity-50"
                disabled={loadingEnable}
              >
                {loadingEnable ? "Activando..." : "Activar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default CardDetailPage;