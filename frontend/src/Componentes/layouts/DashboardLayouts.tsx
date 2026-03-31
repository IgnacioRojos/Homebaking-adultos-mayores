import NavbarDesktop from "./ButtomNavBar";
import ButtomNav from "./ButtomNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">

      <NavbarDesktop />
      <ButtomNav/>

      <div className="p-8">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;