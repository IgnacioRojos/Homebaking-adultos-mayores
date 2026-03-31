import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="
      fixed bottom-0 left-0 w-full
      bg-card border-t shadow-md
      flex justify-around items-center
      py-2
      md:hidden
      z-50
    ">

      {/* Inicio */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-col items-center text-xs"
      >
        <span className={isActive("/dashboard") ? "text-primary font-medium" : "text-secondary-text"}>
          Inicio
        </span>
      </button>

      {/* Tarjetas */}
      <button
        onClick={() => navigate("/cards")}
        className="flex flex-col items-center text-xs"
      >
        <span className={isActive("/cards") ? "text-primary font-medium" : "text-secondary-text"}>
          Tarjetas
        </span>
      </button>

      {/* Cuentas */}
      <button
        onClick={() => navigate("/accounts")}
        className="flex flex-col items-center text-xs"
      >
        <span className={isActive("/accounts") ? "text-primary font-medium" : "text-secondary-text"}>
          Cuentas
        </span>
      </button>

    </div>
  );
};

export default BottomNav;