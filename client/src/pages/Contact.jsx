import React, {useState} from "react";
import contactService from "../services/contactService";

const Contact = () => {

    const [formData, setFormData] = useState({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_message: ""
    });

    const [status, setStatus] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        setIsSuccess(false);

        try {
            const message = await contactService.contact(formData);
            setStatus(message);
            setIsSuccess(true);
            
            // This RESETS the form visually for the user
            setFormData({
                contact_name: "",
                contact_email: "",
                contact_phone: "",
                contact_message: ""
            });
        }
        catch (err) {
            const errorMsg = err.response?.data?.message || "Error sending message. Please try again later.";
            setStatus(errorMsg);
            setIsSuccess(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <h1>Contact Us</h1>
            {status && (
                <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold' }}>
                    {status}
                </p>
            )}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                    required
                /><br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                    required
                /><br /><br />

                <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                    required
                /><br /><br />

                <textarea
                    placeholder="Message"
                    value={formData.contact_message}
                    onChange={(e) => setFormData({...formData, contact_message: e.target.value})}
                    required
                /><br /><br />

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;