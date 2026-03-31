import { useAccounts } from "../../Hooks/useAccounts";
import AccountCard from "../../Componentes/accounts/AccountsCard";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import { api } from "../../Utils/api";

type Props = {
  refetch: () => void;
};

const AccountsPage = ({refetch}: Props) => {
  const { accounts, loading } = useAccounts();
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
  try {
    await api("/accounts", {
      method: "POST",
    });

    alert("Cuenta creada correctamente");
    refetch(); 
    } catch (error) {
      alert("Error al crear cuenta");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 space-y-4">
      <ButtomNavBar/>
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
        className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        + Nueva cuenta
      </button>

      <BottomNav/>

    </div>
  );
};

export default AccountsPage;