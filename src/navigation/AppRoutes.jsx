import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const Signup = lazy(() => import("../screens/signupPage"));
const Login = lazy(() => import("../screens/loginPage/containers/LoginContainer"));
const UserDashboard = lazy(() => import("../screens/userDashboard"));
const AdminDashboard = lazy(() => import("../screens/adminDashboard"));

const Loader = () => <span className="block text-center text-lg font-semibold">Loading...</span>;

const ProtectedRoute = ({ element, allowedRole }) => {
  const { token } = useStoreContext();
  const role = localStorage.getItem("role");

  return token && role === allowedRole ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { token } = useStoreContext();
  const role = localStorage.getItem("role");
  const redirectPath = role === "ADMIN" ? "/admindashboard" : "/dashboard";

  return (
    <>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={token ? <Navigate to={redirectPath} /> : <Login />} />
          <Route path="/admindashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRole="ADMIN" />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRole="USER" />} />
          <Route path="*" element={<Navigate to={token ? redirectPath : "/"} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
