import { useAccounts } from "../../Hooks/useAccounts";
import AccountCard from "../../Componentes/accounts/AccountsCard";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import { api } from "../../Utils/api";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";




const AccountsPage = () => {
  const { accounts, loading, refetch} = useAccounts();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [deleted, setDeleted] = useState(location.state?.deleted || false);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);


  useEffect(() => {
    if (deleted) {
      setTimeout(() => setDeleted(false), 2000);
    }
  }, [deleted]);

  const handleCreateAccount = async () => {
    try {
      await api("/accounts", { method: "POST" });

      setShowSuccessModal(true);
      refetch();
    } catch {
      console.error("Error al crear cuenta");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 space-y-4">
      <ButtomNavBar />

      {accounts?.length > 0 ? (
        accounts.map((acc: any) => (
          <AccountCard
            key={acc._id}
            account={acc}
            onClick={() => navigate(`/accounts/${acc._id}`)}
          />
        ))
      ) : (
        <p>No hay cuentas</p>
      )}

      <button
        onClick={handleCreateAccount}
        className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold border border-white/30 backdrop-blur-sm hover:opacity-90 transition"
      >
        + Nueva cuenta
      </button>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 space-y-4 text-center animate-fadeIn">

            {/* ICONO */}
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-2xl">✓</span>
            </div>

            {/* TEXTO */}
            <h2 className="text-lg font-semibold text-gray-800">
              Cuenta creada
            </h2>

            <p className="text-sm text-gray-500">
              Tu cuenta fue creada correctamente.
            </p>

            {/* BOTÓN */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      {deleted && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm shadow">
          Cuenta eliminada correctamente ✔
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default AccountsPage;