/*import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../screens/pages/signupPage";
import AdminDashboard from "../screens/pages/adminDashboard";
import UserDashboard from "../screens/pages/userDashboard";
import Login from "../screens/pages/loginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default AppRoutes;*/


import React from 'react';
import { useState } from 'react'
import Signup from '../screens/pages/signupPage'
import Login from '../screens/pages/loginPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import UserDashboard from '../screens/pages/userDashboard'
import AdminDashboard from '../screens/pages/adminDashboard'

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
      <Toaster position='bottom-center'/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
};

export default AppRoutes;