import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "../screens/signupPage";
import Login from "../screens/loginPage/containers/LoginContainer";
import UserDashboard from "../screens/userDashboard";
import AdminDashboard from "../screens/adminDashboard";
import { useStoreContext } from "../contextApi/ContextApi";

const AppRoutes = () => {
  const { token } = useStoreContext();

  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route
          path="/dashboard"
          element={token ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admindashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
};


export default AppRoutes;