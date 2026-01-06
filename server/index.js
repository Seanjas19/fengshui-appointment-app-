const express = require("express");
const cors = require("cors");
const db = require("./db");
const jwt = require("jsonwebtoken");
const authorize = require("./middleware/authorization.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//To know server is running
app.get("/", (req, res) => {
    res.send("Feng Shui Server is Running");
});


//Let user to see their booking
app.get("/api/appointment", authorize, async (req, res) => {
    try{
        const get_appointments = await db.query("SELECT * FROM appointments WHERE user_id = $1", [req.user]);

        res.status(200).json({
            message: "Appointment Retrieved Successfully!",
            appoinments: get_appointments.rows
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//User login with authentication and authorization(JWT)
app.post("/api/login", async (req, res) => {
    try {
        const {user_email, user_password} = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (checkUser.rows.length === 0) {
            return res.status(401).json({message: "Invalid Email and Password!"});
        }

        const valid_password = await bcrypt.compare(
            user_password,
            checkUser.rows[0].user_password
        );

        if (!valid_password) {
            return res.status(401).json({message: "Invalid Email and Password!"});
        }

        //Give user a Wristband for Bounder to check without this is unauthorized
        const token = jwt.sign(
            {id: checkUser.rows[0].user_id},
            process.env.JWT_SECRET,
            {expiresIn: "3h"}
        );

        res.status(200).json({
            message: "Login Successful!",
            token: token,
            user: {
                id: checkUser.rows[0].user_id,
                name: checkUser.rows[0].username
            }
        })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Let user to sign up an account and the password they created should be hashed
app.post("/api/sign-up", async (req, res) => {
    try {
        const {username, user_email, user_password, user_phone} = req.body;

        const existUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (existUser.rows.length != 0) {
            return res.status(401).send("User already existed!");
        }

        const numSalt = 10;
        const salt = await bcrypt.genSalt(numSalt);
        const bcrypt_password = await bcrypt.hash(user_password, salt);

        const newUser = await db.query(
            "INSERT INTO users( username, user_email, user_password, user_phone) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, user_email, bcrypt_password, user_phone]
        );

        res.status(201).json({
            message: "Sign Up Successful!",
            user_id: newUser.rows[0].user_id
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//Let non-member user to create contact
app.post("/api/contact", async (req, res) => {
    try{
        //Extract Contact data from Request Body
        const {contact_name, contact_email, contact_phone, contact_message} = req.body;

        //Insert Contact data to Database. Why contacts(...) because if don't put it will assume contact_id as $1 and all the data for insertion will crash and messy
        const newContact = await db.query(
            "INSERT INTO contacts(contact_name, contact_email, contact_phone, contact_message) VALUES ($1, $2, $3, $4) RETURNING *",
            [contact_name, contact_email, contact_phone, contact_message]
        );
        
        //pass successful message to browser 
        res.status(201).json({
            message: "Message sent successfully!",
            data: newContact.rows[0]
        });

    }
    //if error it will response status as "Internal Server Error"
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//let authorized user to book their appointment
app.post("/api/appointment", authorize, async (req, res) => {

    try{

        const {appointment_date, appointment_status} = req.body;

        const newAppointment = await db.query(
            "INSERT INTO appointments(user_id, appointment_date, appointment_status) VALUES ($1, $2, $3) RETURNING *",
            [req.user, appointment_date, appointment_status]
        );
        
        res.status(201).json({
            message: "Appointment Successful",
            appointment: newAppointment.rows[0]
        })

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
})


//Backend is listen to which PORT 
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
