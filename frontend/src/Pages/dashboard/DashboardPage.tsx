import DashboardLayout from "../../Componentes/layouts/DashboardLayouts";
import AccountCard from "../../Componentes/accounts/AccountsCard";
import DebitCardPreview from "../../Componentes/accounts/DebitCardPreview";
import AliasCard from "../../Componentes/accounts/AccountsAlias";
import TransferCard from "../../Componentes/transfers/TransfersCard";
import { useDashboard } from "../../Hooks/useDashboard.ts";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { account, cards, loading,refetch  } = useDashboard();
  const navigate = useNavigate();

  const debitCard = cards?.find((c: any) => c.type === "debit" && c.status === "active");
  
  if (loading) return <p className="bg-main text-primary p-4">Cargando...</p>;
  return (
    <DashboardLayout>

      <div className="bg-main min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3">

          {/* IZQUIERDA */}
          <div className="md:col-span-2 space-y-4">
            {account && (
              <AccountCard
                account={account}
                onClick={() => navigate(`/accounts/${account._id}`)}
              />
            )}
          </div>

          {/* DERECHA */}
          <div className="space-y-4">
            <AliasCard account={account} refetch={refetch}/>
            <DebitCardPreview card={debitCard} />
          </div>

          {/* ABAJO */}
          <div className="md:col-span-3">
            <TransferCard />
          </div>

        </div>
      </div>

    </DashboardLayout>
  );
};

export default DashboardPage;





