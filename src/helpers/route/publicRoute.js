import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function PublicRoute(props) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token && props.restricted) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
