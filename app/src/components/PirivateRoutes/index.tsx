import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user.user_id ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;
