import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Use 'api' so the interceptor sends your token!
                const response = await api.get('/appointment');
                console.log("Type of response.data:", typeof response.data); // Should be 'object'
                console.log("Is it an Array?:", Array.isArray(response.data)); // Must be 'true'
                console.log("Actual Data:", response.data);
                setAppointments(response.data.appointments);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false); 
            }
        };
        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Cancel this appointment?")) return;
        try {
            await api.delete(`/appointment/${id}`);
            setAppointments((prevAppointments) =>
                prevAppointments.filter(appt => appt.appointment_id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };
    
    if (loading) return <p>Loading your appointments...</p>;

    return (
        <div>
            <h1>My Feng Shui Appointments</h1>
            <button 
                onClick={() => navigate('/book')}
                style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                + Book New Consultation
            </button>
            {appointments.length === 0 ? (
                <p>No appointments found. Book one today!</p>
            ) : (
                <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.appointment_id}>
                                <td>{appt.appointment_date}</td>
                                <td>{appt.service_type}</td>
                                <td>{appt.appointment_status}</td>
                                <td>
                                    <button
                                        onClick={() => navigate('/book', { state: { editData: appt } })}
                                        style={{ marginRight: '10px', cursor: 'pointer', color: 'blue' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(appt.appointment_id)} 
                                        style={{ color: 'red', cursor: 'pointer'}}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};   

export default Appointment;