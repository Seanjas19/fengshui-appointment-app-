const db = require("../db");

const createContact = async(req, res, next) => {
    try {
        //Extract Contact data from Request Body
        const {contact_name, contact_email, contact_phone, contact_message} = req.body;
        
        //Insert Contact data to Database. Why contacts(...) because if don't put it will assume contact_id as $1 and all the data for insertion will crash and messy
        const newContact = await db.query(
            "INSERT INTO contacts(contact_name, contact_email, contact_phone, contact_message) VALUES ($1, $2, $3, $4) RETURNING *",
            [contact_name, contact_email, contact_phone, contact_message]
        );
                
        //pass successful message to browser 
        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            data: newContact.rows[0]
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = { createContact };