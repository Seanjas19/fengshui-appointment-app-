import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Contact from './pages/Contact.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Appointment from './pages/Appointment.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define which path shows which component */}
          
        <Route path="/" element={<h1>Welcome to Feng Shui Master</h1>} />
          
        <Route path="/contact" element={<Contact />} />
          
        <Route path="/sign-up" element={<SignUp />} />
          
        <Route path="/login" element={<Login />} />

        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointment />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
