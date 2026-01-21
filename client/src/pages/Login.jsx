import React, { useState } from "react";
import authService from "../services/authService";

const Login = () => {
    const [formData, setFormData] = useState({
        user_email: "",
        user_password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error

        try {
            await authService.login(formData.user_email, formData.user_password);
            setSuccess(true);

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
        catch (err) {
            setError(err.response?.data?.message || "Invalid username or password");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                {success && <p style={{ color: 'green', fontWeight: 'bold' }}>Login successful!</p>}
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setFormData({...formData, user_password: e.target.value})}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;