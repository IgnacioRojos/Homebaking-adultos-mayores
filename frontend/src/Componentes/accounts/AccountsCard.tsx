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
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Alias */}
      <p className="font-semibold text-lg">
        {account.alias}
      </p>

      {/* Tipo */}
      <p className="text-sm text-gray-500">
        {account.type}
      </p>

      {/* Balance */}
      <p className="mt-2 font-medium">
        {formatCurrency(account.balance ?? 0)}
      </p>

      {/* Cuenta principal */}
      {account.isPrimary && (
        <p className="text-green-600 text-sm mt-1">
          Cuenta principal
        </p>
      )}
    </div>
  );
};

export default AccountCard;