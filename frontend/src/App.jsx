import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from './pages/Privates/Dashboard';
import Profile from "./pages/Privates/Profile";
import ErrorPage from "./pages/ErrorHandler/ErrorPage";
import ProtectedRoute from './pages/ErrorHandler/Protection';
import EventsCreate from './pages/Privates/EventsCreate';
import EventDetails from './pages/Privates/EventDetails';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<ProtectedRoute></ProtectedRoute>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/signup' exact element={<SignUp/>} />
          <Route path='/dashboard' exact element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='/profile' exact element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/createEvents' exact element={<ProtectedRoute><EventsCreate/></ProtectedRoute>} />
          <Route path='/event/:eventId' exact element={<ProtectedRoute><EventDetails/></ProtectedRoute>} />
          <Route path='/errorPage' exact element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

// const Root = () => {
//   //we are just checking if token exists or not
//   const isAuthenticated = !!localStorage.getItem("token");
//   return isAuthenticated?(<Navigate to="/dashboard"/>):(<Navigate to="/login"/>);
// }

// const ProfileProtection = ()=>{
//   const isAuthenticated = !!localStorage.getItem("token");
//   return isAuthenticated ? <Profile /> : <Navigate to="/errorPage" />;
// }

export default App