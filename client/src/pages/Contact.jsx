import React, {useState} from "react";
import api from "../api/axios";

const Contact = () => {

    const [formData, setFormData] = useState({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = api.post("/contact", formData);
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
                {/* Add inputs for email, phone, and message similarly */}
                <button type="Submit">Send</button>
            </form>
        </div>
    );
}

export default Contact;