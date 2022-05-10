import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);

  if (!token) {
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  }

  if (props.isAdmin && dataUser.role !== "admin") {
    return <Navigate to={"/auth/register"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
