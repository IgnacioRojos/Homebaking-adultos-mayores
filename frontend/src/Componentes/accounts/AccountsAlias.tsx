import { useState, useRef, useEffect } from "react";
import { api } from "../../Utils/api";

type Props = {
  account: any;
  refetch: () => void;
};

const AccountsAlias = ({ account, refetch }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newAlias, setNewAlias] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  if (!account) return null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setNewAlias("");
        setError("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Error al copiar");
    }
  };

  const handleChange = (value: string) => {
    setNewAlias(value);

    if (value.length < 3) {
      setError("El alias debe tener al menos 3 caracteres");
    } else {
      setError("");
    }
  };

  const handleEditAlias = async () => {
    if (newAlias.length < 3) {
      setError("Alias inválido");
      return;
    }

    try {
      setLoading(true);

      await api(`/accounts/${account._id}/alias`, {
        method: "PATCH",
        body: JSON.stringify({ alias: newAlias }),
      });

      setIsOpen(false);
      setNewAlias("");
      setError("");
      refetch();
    } catch (error: any) {
      setError(error.message || "Error al actualizar alias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md space-y-3">

        <p className="text-white">Alias</p>

        <div className="flex items-center justify-between mt-2">
          <h2 className="font-bold">
            {account.alias}
          </h2>

          <div className="flex gap-3 pl-2">
            <button
              onClick={handleCopy}
              className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 "
            >
              Copiar
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30"
            >
              Editar
            </button>
          </div>
        </div>

        {copied && (
          <p className="text-lime-400 text-sm mt-1">
            Copiado ✔
          </p>
        )}

        <p className="text-white mt-4">CBU</p>

        <h3 className="text-sm">
          {account.cbu}
        </h3>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-200 scale-100"
          >

            <h2 className="text-lg font-semibold mb-4">
              Editar alias
            </h2>

            <input
              type="text"
              value={newAlias}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={account.alias}
              className={`w-full p-3 border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm mb-2">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => {
                  setIsOpen(false);
                  setNewAlias("");
                  setError("");
                }}
                className="px-4 py-2 rounded-full bg-gray-200"
              >
                Cancelar
              </button>

              <button
                onClick={handleEditAlias}
                disabled={loading}
                className="px-4 py-2  bg-purple-600  text-white disabled:opacity-50backdrop-blur-sm text-m font-semibold rounded-full border border-white/30"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AccountsAlias;