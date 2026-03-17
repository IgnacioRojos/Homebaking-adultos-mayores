import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children }: any) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;