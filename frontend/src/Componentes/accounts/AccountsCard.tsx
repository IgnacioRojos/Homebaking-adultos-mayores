type Props = {
  account: any;
  onClick?: () => void;
};

const AccountCard = ({ account, onClick }: Props) => {

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(value);


  return (
    <div
      className="bg-linear-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 shadow-md space-y-3 flex justify-between "
    >
      <div className="order-2">
        {/* Alias */}
        <p className="font-semibold text-lg text-white ">
          {account.type === "caja_ahorro" && "Caja de ahorro"}
        </p>

        {/* Tipo */}
        <p className="text-sm text-white">
          {account.type}
        </p>

        {/* Balance */}
        <p className="mt-2 font-medium text-white">
          {formatCurrency(account.balance ?? 0)}
        </p>
      <br/>

       {/* Cuenta principal */}
      {account.isPrimary && (
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
          Principal
        </span>
        )}

      </div>
  
        {/* BOTÓN */}
        <button
          onClick={onClick}
          className=  "bg-white/20  text-white text-xl font-semibold px-10 py-2 rounded-full border border-white/30 order-2 h-12 "
        >
          Ver
        </button>
   
    </div>
  );
};

export default AccountCard;