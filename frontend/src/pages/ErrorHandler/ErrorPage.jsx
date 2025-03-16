import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <div className="error-divider"></div>
        <h2>Access Denied</h2>
        <p>The page you are trying to access either does not exist or you are unauthorized.</p>
        <div className="error-actions">
          <button 
            className="login-button"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage