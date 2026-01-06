import React, {useState} from "react";
import api from "../api/axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        user_email: "",
        user_password: "",
        user_phone: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/sign-up", formData);
            alert(response.data.message);
        }
        catch (err) {
            alert("Error signing up. Please try again later.");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
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
                    type="tel"
                    placeholder= "Phone Number"
                    onChange= {(e) => setFormData({...formData, user_phone: e.target.value})}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}



export default SignUp;
