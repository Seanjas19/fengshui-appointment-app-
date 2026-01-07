import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f4f4f4' }}>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/appointments">Appointments</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>

            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/sign-up">Sign Up</Link>  
                </>
            )}
        </nav>
    );
}

export default Navbar;