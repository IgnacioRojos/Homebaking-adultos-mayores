import { useState } from "react";
import { api } from "../../Utils/api";

type Props = {
  currentEmail: string;
  onClose: () => void;
  onSuccess: (updatedUser: any) => void;
};

const EditEmailModal = ({ currentEmail, onClose, onSuccess }: Props) => {
  const [email, setEmail] = useState(currentEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      const res =await api("/auth/email", {
        method: "PUT",
        body: JSON.stringify({ email }),
        });

      onSuccess(res.user); // refetch perfil
      onClose();
      console.log("UPDATE RESPONSE:", res);
    } catch (err: any) {
      setError("No se pudo actualizar el email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          Editar Email
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
          className="w-full border rounded-lg p-2 mb-3"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancelar
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmailModal;