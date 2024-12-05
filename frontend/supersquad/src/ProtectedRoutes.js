import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/creator/login" />;
};

export default PrivateRoutes;
