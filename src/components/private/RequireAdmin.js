import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StateContext } from "../../App";

const RequireAdmin = ({ children }) => {
  const [state] = useContext(StateContext);
  const location = useLocation();

  if (state.user!=='owner' || state.user!=='admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
