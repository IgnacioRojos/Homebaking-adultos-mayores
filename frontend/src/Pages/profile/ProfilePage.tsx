import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import { useEffect, useState } from "react";
import { api } from "../../Utils/api";
import EditEmailModal from "../../Componentes/iu/EditEmailModal";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

    const getProfile = async () => {
    try {
        const data = await api("/auth/me");
        setUser(data);
    } catch (error) {
        console.error("Error obteniendo perfil:", error);
    }
    };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return <p className="p-4">Cargando perfil...</p>;
  }
  const handleUpdateSuccess = (updatedUser: any) => {
    setUser(updatedUser); 
    getProfile();
  };

  return (
    <div className="min-h-screen bg-background">
      <ButtomNavBar />

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-primary">Mi perfil</h2>

        <div className="bg-card p-4 rounded-2xl shadow space-y-2">
          <p><span className="font-semibold">Nombre y Apellido:</span> {user.fullName}</p>
          <p><span className="font-semibold">Documento:</span> {user.dni}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-20 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg"
        >
          Editar Email
        </button>
      </div>
      {showModal && (
      <EditEmailModal
        currentEmail={user.email}
        onClose={() => setShowModal(false)}
        
        onSuccess={handleUpdateSuccess}
      />
      )}

      <BottomNav />
    </div>
  );
};

export default ProfilePage;