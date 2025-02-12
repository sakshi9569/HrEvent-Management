import { useState } from 'react'
import './App.css'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Footer from './components/Footer'
import Navbar from './Components/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import UserDashboard from './Components/UserDashboard'
import AdminDashboard from './Components/AdminDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Toaster position='bottom-center'/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
