import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../../contextApi/ContextApi";

const PrivateLayoutContainer = ({ children, requiredRole }) => {
  const { token, role } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "ADMIN" ? "/admindashboard" : "/dashboard"} replace />;
  }

  return children;
};

export default PrivateLayoutContainer;
