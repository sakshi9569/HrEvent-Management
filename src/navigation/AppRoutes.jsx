import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const Signup = lazy(() => import("../screens/signupPage"));
const Login = lazy(() => import("../screens/loginPage/containers/LoginContainer"));
const UserDashboard = lazy(() => import("../screens/userDashboard"));
const AdminDashboard = lazy(() => import("../screens/adminDashboard"));

const Loader = () => <span className="block text-center text-lg font-semibold">Loading...</span>;

const AppRoutes = () => {
  const { token } = useStoreContext();
  const role = localStorage.getItem("role");

  return (
    <>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? (role == "ADMIN" ? <Navigate to="/admindashboard" /> : <Navigate to="/dashboard" />) : <Login />} />
        <Route
          path="/admindashboard"
          element={token && role == "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={token && role == "USER" ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={token ? (role == "ADMIN" ? <Navigate to="/admindashboard" />: <Navigate to="/dashboard" /> ): <Navigate to="/" />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
