import React, { useState } from "react";
import authService from "../services/authService";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        user_email: "",
        user_password: "",
        confirm_password: "",
        user_contact: ""
    });
    
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.user_password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.username || !formData.user_email || !formData.user_password || !formData.user_contact) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await authService.register({
                username: formData.username.trim(),
                user_email: formData.user_email.trim(),
                user_password: formData.user_password,
                user_contact: formData.user_contact.trim()
            });
            alert(response.message);
        }
        catch (err) {
            setError(err.response?.data?.message || "Error signing up. Please try again later.");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <input
                    type="text"
                    placeholder= "Username"
                    onChange= {(e) => setFormData({...formData, username: e.target.value})}
                />
                <input
                    type="email"
                    placeholder= "Email"
                    onChange= {(e) => setFormData({...formData, user_email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder= "Password"
                    onChange= {(e) => setFormData({...formData, user_password: e.target.value})}
                />
                <input
                    type="password"
                    placeholder= "Confirm Password"
                    onChange= {(e) => setFormData({...formData, confirm_password: e.target.value})}
                />
                <input
                    type="tel"
                    placeholder= "Phone Number"
                    onChange= {(e) => setFormData({...formData, user_contact: e.target.value})}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}



export default SignUp;
