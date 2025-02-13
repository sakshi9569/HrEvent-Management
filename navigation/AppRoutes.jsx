import React from 'react';
import { useState } from 'react'
import Signup from '../screens/pages/signupPage'
import Login from '../screens/pages/loginPage/containers/LoginContainer'
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