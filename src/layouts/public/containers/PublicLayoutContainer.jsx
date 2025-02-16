import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../../contextApi/ContextApi";
import PublicHeader from "../components/PublicHeader";

const PublicLayoutContainer = ({ children }) => {
  const { token, role } = useStoreContext();
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("USER_DATA")) || {};
  const isAuthenticated = token || storedData.token;
  const userRole = role || storedData.role;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(userRole === "ADMIN" ? "/admindashboard" : "/dashboard");
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <PublicHeader />
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "64px" }}>
        {children}
      </main>
    </div>
  );
};

export default PublicLayoutContainer;
