import { useState } from "react";
import { api } from "../../Utils/api";


type Props = {
  account: any;
  refetch: () => void;
};



const AccountsAlias = ({ account, refetch }: Props) => {
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.alias);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar");
    }
  };

  const handleEditAlias = async () => {
  const newAlias = prompt("Ingresá el nuevo alias:");

  if (!newAlias) return;

  try {
    await api(`/accounts/${account._id}/alias`, {
      method: "PATCH",
      body: JSON.stringify({ alias: newAlias }),
    });

    alert("Alias actualizado");
    refetch();
  } catch (error: any) {
    alert(error.message || "Error al actualizar alias");
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-gray-500">Alias</p>

      <div className="flex items-center justify-between mt-2">
        <h2 className="font-bold">
          {account.alias}
        </h2>

        <button
          onClick={handleCopy}
          className="text-blue-600 text-sm font-semibold"
        >
          Copiar
        </button>
        <button
          onClick={handleEditAlias}
          className="text-blue-600 text-sm font-semibold"
        >
          Editar
        </button>
      </div>

      {copied && (
        <p className="text-green-500 text-sm mt-1">
          Copiado ✔
        </p>
      )}

      <p className="text-gray-500 mt-4">CBU</p>

      <h3 className="text-sm">
        {account.cbu}
      </h3>

    </div>
  );
};

export default AccountsAlias;