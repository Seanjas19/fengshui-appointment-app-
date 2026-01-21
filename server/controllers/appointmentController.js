const db = require("../db");




const getAppointment = async (req, res, next) => {
    try {
        const get_appointment = await db.query("SELECT * FROM appointments WHERE user_id = $1", [req.user]);

        res.status(200).json({
            success: true,
            message: "Appointment Retrieved Successfully!",
            appointments: get_appointment.rows
        });
    }
    catch (err) {
        next(err)
    }
}

const createAppointment = async (req, res, next) => {
    try {
        const {appointment_date, appointment_status, service_type, user_message} = req.body;
        
        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            const error = new Error("You cannot book an appointment in the past or for today!");
            error.statusCode = 400;
            throw error;
        }
        
        const newAppointment = await db.query(
            "INSERT INTO appointments(user_id, appointment_date, appointment_status, service_type, user_message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [req.user, appointment_date, appointment_status, service_type, user_message]
        );
                
        console.log("DEBUG 4 : New Appointment save in SQL:", newAppointment.rows[0]);
        
        res.status(201).json({
            success: true,
            message: "Appointment Successful",
            appointment: newAppointment.rows[0]
        })
        
    }
    catch (err) {
        next(err);
    }
}

const updateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { appointment_date, service_type, user_message } = req.body;
        
        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            const error = new Error("You cannot book an appointment in the past or for today!");
            error.statusCode = 400;
            throw error;
        }
        
        const updateData = await db.query(
            "UPDATE appointments SET appointment_date = $1, service_type = $2, user_message = $3 WHERE appointment_id = $4 AND user_id = $5 RETURNING *",
            [appointment_date, service_type, user_message, id, req.user]
        );
        
        if (updateData.rows.length === 0) {
            const error = new Error("Appointment not found or unauthorized");
            error.statusCode = 404;
            throw error;
        }
        
        res.json({ message: "Appointment Updated Successfully!" });
    }
    catch (err) {
        next(err);
    }
}

const deleteAppointment = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const user_id = req.user;
        
        const del_appointment = await db.query("DELETE FROM appointments WHERE appointment_id = $1 AND user_id = $2 RETURNING *", [id, user_id]);
        
        if (del_appointment.rows.length === 0) {
            const error = new Error("Appointment not found or unauthorized");
            error.statusCode = 404;
            throw error;
        }
                
        res.status(200).json({
            success: true,
            message: "Appointment Cancelled Successfully!"
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
}