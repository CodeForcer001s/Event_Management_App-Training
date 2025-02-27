import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './Pages/publics/LandingPage'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Unauthenticated User Routes */}
        <Route path="/" element={ <LandingPage/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes - If not authenticated, redirect to login */}
        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/events" element={isAuthenticated ? <Events /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  )
}

export default App
