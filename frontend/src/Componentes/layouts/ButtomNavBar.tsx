import { useNavigate, useLocation } from "react-router-dom";

const ButtomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className=" w-full bg-card shadow-sm border-b">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

        {/* Logo */}
        <h1
          className="text-lg md:text-xl font-bold text-primary cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          HomeBanking
        </h1>

        {/* Navegación */}
        <div className="hidden md:flex items-center gap-6">
          
          <button
            onClick={() => navigate("/dashboard")}
            className={`text-sm font-medium transition ${
              isActive("/dashboard")
                ? "text-primary border-b-2 border-accent"
                : "text-secondary-text hover:text-primary"
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => navigate("/cards")}
            className={`text-sm font-medium transition ${
              isActive("/cards")
                ? "text-primary border-b-2 border-accent"
                : "text-secondary-text hover:text-primary"
            }`}
          >
            Tarjetas
          </button>

          <button
            onClick={() => navigate("/accounts")}
            className={`text-sm font-medium transition ${
              isActive("/accounts")
                ? "text-primary border-b-2 border-accent"
                : "text-secondary-text hover:text-primary"
            }`}
          >
            Cuentas
          </button>

        </div>

        {/* Usuario */}
        <div className="flex items-center gap-3">

          <button
            className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center hover:shadow transition"
            onClick={() => navigate("/profile")}
          >
            👤
          </button>

        </div>

      </div>
    </div>
  );
};

export default ButtomNavBar;