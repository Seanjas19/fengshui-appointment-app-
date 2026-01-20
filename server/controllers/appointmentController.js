const db = require("../db");




const getAppointment = async (req, res) => {
    try {
        const get_appointment = await db.query("SELECT * FROM appointments WHERE user_id = $1", [req.user]);

        res.status(200).json({
            message: "Appointment Retrieved Successfully!",
            appointments: get_appointment.rows
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const createAppointment = async (req, res) => {
    try {
        const {appointment_date, appointment_status, service_type, user_message} = req.body;
        
        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            return res.status(400).json({message: "You cannot book an appointment in the past!"});
        }
        
        const newAppointment = await db.query(
            "INSERT INTO appointments(user_id, appointment_date, appointment_status, service_type, user_message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [req.user, appointment_date, appointment_status, service_type, user_message]
        );
                
        console.log("DEBUG 4 : New Appointment save in SQL:", newAppointment.rows[0]);
        
        res.status(201).json({
            message: "Appointment Successful",
            appointment: newAppointment.rows[0]
        })
        
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointment_date, service_type, user_message } = req.body;
        
        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            return res.status(400).json({ message: "You cannot book an appointment in the past or for today!" });
        }
        
        const updateData = await db.query(
            "UPDATE appointments SET appointment_date = $1, service_type = $2, user_message = $3 WHERE appointment_id = $4 AND user_id = $5 RETURNING *",
            [appointment_date, service_type, user_message, id, req.user]
        );
        
        if (updateData.rows.length === 0) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }
        
        res.json({ message: "Appointment Updated Successfully!" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        
        const user_id = req.user;
        
        const del_appointment = await db.query("DELETE FROM appointments WHERE appointment_id = $1 AND user_id = $2 RETURNING *", [id, user_id]);
        
        if (del_appointment.rows.length === 0) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }
                
        res.status(200).json({message: "Appointment Cancelled Successfully!"});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
}