import { Navigate, Outlet } from "react-router-dom";
const RedirectionRoutes = () => {
  const auth = localStorage.getItem("token");

  return !auth ? <Outlet /> : <Navigate to="/creator/home" />;
};

export default RedirectionRoutes;
