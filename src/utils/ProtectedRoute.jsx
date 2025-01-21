import { Outlet } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <SignIn />;
};

export default ProtectedRoute;
