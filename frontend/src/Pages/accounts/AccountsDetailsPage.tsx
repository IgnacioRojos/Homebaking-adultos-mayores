import { useParams, useNavigate } from "react-router-dom";
import { useAccountDetail } from "../../Hooks/useAccountsDetails";
import { api } from "../../Utils/api";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";

const AccountDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { detail, loading, refetch } = useAccountDetail(id);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(value);

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-AR").format(new Date(date));

  // ===============================
  // ACCIONES
  // ===============================

  const handleMakePrimary = async () => {
    await api(`/accounts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isPrimary: true })
    });

    alert("Cuenta principal actualizada");
    refetch();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("¿Eliminar cuenta?");
    if (!confirmDelete) return;

    await api(`/accounts/${id}`, {
      method: "DELETE"
    });

    alert("Cuenta eliminada");
    navigate("/accounts");
  };

  // ===============================
  // UI STATES
  // ===============================

  if (loading)
    return <p className="p-4 text-secondary-text">Cargando...</p>;

  if (!detail)
    return <p className="p-4 text-secondary-text">No hay datos</p>;

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
            {detail.alias}
          </h1>

          <p className="text-sm text-secondary-text">
            CBU: {detail.cbu}
          </p>

          {detail.isPrimary && (
            <p className="text-green-500 font-medium">
              Cuenta principal
            </p>
          )}
        </div>

        {/* BALANCE */}
        <div className="bg-card rounded-2xl p-5 shadow-sm space-y-2">
          <h2 className="font-semibold text-primary">
            Saldo disponible
          </h2>

          <p className="text-2xl font-bold text-primary">
            {formatCurrency(detail.balance)}
          </p>
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
            <p className="text-secondary-text text-sm">
              No hay movimientos
            </p>
          )}
        </div>

        {/* ACCIONES */}
        <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col gap-3">

          {!detail.isPrimary && (
            <button
              onClick={handleMakePrimary}
              className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium"
            >
              Hacer principal
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 rounded-lg text-sm font-medium"
          >
            Eliminar cuenta
          </button>

        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default AccountDetailPage;