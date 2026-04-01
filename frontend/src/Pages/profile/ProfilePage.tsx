import ButtomNavBar from "../../Componentes/layouts/ButtomNavBar";
import BottomNav from "../../Componentes/layouts/ButtomNav";
import { useEffect, useState } from "react";
import { api } from "../../Utils/api";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <ButtomNavBar />

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-primary">Mi perfil</h2>

        <div className="bg-card p-4 rounded-2xl shadow space-y-2">
          <p><span className="font-semibold">Nombre:</span> {user.name}</p>
          <p><span className="font-semibold">Apellido:</span> {user.lastName}</p>
          <p><span className="font-semibold">Documento:</span> {user.document}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;