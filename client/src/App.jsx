import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Contact from './pages/Contact.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'


function App() {
  return (
    <Router>
      <nav>
        {/* These are like <a> tags but they don't refresh the page */}
        <Link to="/contact">Contact</Link>
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        {/* Define which path shows which component */}
        <Route path="/" element={<h1>Welcome to Feng Shui Master</h1>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
