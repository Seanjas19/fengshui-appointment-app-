import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appointmentService from "../services/appointmentService";


const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const editData = location.state?.editData;

    const [status, setStatus] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        appointment_date: "",
        service_type: "Home Audit",
        user_message: ""
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                appointment_date: editData.appointment_date.split('T')[0],
                service_type: editData.service_type || "Home Audit",
                user_message: editData.user_message || ""
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Processing...");

        try {

            if (editData) {
                await appointmentService.updateAppointment(editData.appointment_id, formData);
            }
            else {
                await appointmentService.createAppointment(formData);
                setStatus("Success! Your appointment is booked.");
            }

            setIsSuccess(true);
            
            // Optional: Clear form after success
            setFormData({ appointment_date: "", service_type: "Home Audit", user_message: "" });
            
        } catch (err) {
            setStatus(err.response?.data?.message || "Failed to book appointment.");
        }
    };

    const date = new Date()
    date.setDate(date.getDate() + 1)
    
    const tomorrow = date.toISOString().split('T')[0];

    if (isSuccess) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <div style={{ fontSize: '50px' }}>✅</div>
                <h2>Booking Confirmed!</h2>
                <p>Your Feng Shui consultation has been scheduled successfully.</p>
                <button 
                    onClick={() => navigate('/appointments')}
                    style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    View My Appointments
                </button>
            </div>
        );
    }

    

    return (

        <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <h2>{editData ? "Edit Your Appointment" : "Book a Feng Shui Consultation"}</h2>
            {status && <p>{status}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Date:</label><br />
                <input 
                    type="date" 
                    name="appointment_date"
                    min={tomorrow}
                    required
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                /><br /><br />

                <label>Service Type:</label><br />
                <select 
                    value={formData.service_type}
                    onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                >
                    <option value="Home Audit">Home Audit</option>
                    <option value="Office Consultation">Office Consultation</option>
                    <option value="Personal Bazi Reading">Personal Bazi Reading</option>
                </select><br /><br />

                <label>Message (Optional):</label><br />
                <textarea 
                    value={formData.user_message}
                    onChange={(e) => setFormData({...formData, user_message: e.target.value})}
                /><br /><br />

                <button type="submit">
                    {editData ? "Update Appointment" : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;