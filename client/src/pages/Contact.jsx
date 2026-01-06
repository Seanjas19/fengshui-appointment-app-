import React, {useState} from "react";
import api from "../api/axios";

const Contact = () => {

    const [formData, setFormData] = useState({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/contact", formData);
            alert(response.data.message);
        }
        catch (err) {
            alert("Error sending message. Please try again later.");
        }
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder= "Name"
                    onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                />

                <input
                    type="email"
                    placeholder= "Email"
                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                />

                <input
                    type="tel"
                    placeholder= "Phone"
                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                />

                <textarea
                    placeholder= "Message"
                    onChange={(e) => setFormData({...formData, contact_message: e.target.value})}
                />
                {/* Add inputs for email, phone, and message similarly */}
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Contact;