import { useParams, useNavigate } from "react-router-dom";
import { useAccountDetail } from "../../Hooks/useAccountsDetails";
import { api } from "../../Utils/api";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import { useState, useRef, useEffect } from "react";

const AccountDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { detail, loading, refetch } = useAccountDetail(id);

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // ===============================
  // CLICK OUTSIDE
  // ===============================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // ===============================
  // FORMATTERS
  // ===============================
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(value);

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-AR").format(new Date(date));

  const getAccountName = (type: string) => {
    switch (type) {
      case "caja_ahorro":
        return "Caja de ahorro";
      default:
        return "Cuenta";
    }
  };

  // ===============================
  // ACTIONS
  // ===============================
  const handleMakePrimary = async () => {
    await api(`/accounts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isPrimary: true })
    });

    refetch();
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api(`/accounts/${id}`, {
        method: "DELETE"
      });

      navigate("/accounts", {
        state: { deleted: true }
      });
    } catch {
      setDeleting(false);
    }
  };

  // ===============================
  // STATES
  // ===============================
  if (loading)
    return <p className="p-4 text-secondary-text">Cargando...</p>;

  if (!detail)
    return <p className="p-4 text-secondary-text">No hay datos</p>;

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="bg-main min-h-screen p-4 pb-20">
      <ButtomNavBar />

      <div className="max-w-3xl mx-auto space-y-4 mt-4">

        {/* HEADER CARD */}
        <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-xl font-bold">
                {getAccountName(detail.type)}
              </h1>

              <p className="text-sm opacity-80">
                Alias: {detail.alias}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-end">

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                detail.isActive
                  ? "bg-white/20"
                  : "bg-red-500"
              }`}>
                {detail.isActive ? "Activa" : "Inactiva"}
              </span>

              {detail.isPrimary && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                  Principal
                </span>
              )}

            </div>

          </div>

          <div className="pt-2">
            <p className="text-xs opacity-70">CBU</p>
            <p className="text-sm tracking-wider">{detail.cbu}</p>
          </div>

        </div>

        {/* BALANCE */}
        <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

          <p className="text-sm text-white">
            Saldo disponible
          </p>

          <p className="text-3xl font-bold text-white mt-1">
            {formatCurrency(detail.balance)}
          </p>

        </div>

        {/* MOVIMIENTOS */}
        <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">
          <h2 className="font-semibold text-white mb-3">
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
                      {mov.type}
                    </p>
                    <p className="text-xs text-secondary-text">
                      {formatDate(mov.createdAt)}
                    </p>
                  </div>

                  <p className="font-semibold text-primary">
                    {formatCurrency(mov.amount)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-sm">
              No hay movimientos
            </p>
          )}
        </div>

        {/* ACCIONES */}
        <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col gap-3">

          {!detail.isPrimary && (
            <button
              onClick={handleMakePrimary}
              className="px-4 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30"
            >
              Convertir en cuenta principal
            </button>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold border border-white/30"
          >
            Eliminar cuenta
          </button>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4 animate-fadeIn"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              ¿Eliminar cuenta?
            </h2>

            <p className="text-sm text-gray-500">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2  border-gray-300 text-gray-700 font-medium bg-gray-100 transition rounded-full"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 transition  backdrop-blur-sm text-white font-medium  px-3 py-1 rounded-full border border-white/30"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>

        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default AccountDetailPage;