const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const register = async (req, res, next) => {
    try {
        const {username, user_email, user_password, user_contact} = req.body;

        const existUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (existUser.rows.length !== 0) {
            const error = new Error("User already exists!");
            error.statusCode = 400;
            throw error;
        }

        const numSalt = 10;

        const salt = await bcrypt.genSalt(numSalt);

        const bcrypt_password = await bcrypt.hash(user_password, salt);

        const newUser = await db.query(
            "INSERT INTO users( username, user_email, user_password, user_contact ) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, user_email, bcrypt_password, user_contact]
        );

        res.status(201).json({
            success: true,
            message: "Sign Up Successful!",
            user_id: newUser.rows[0].user_id
        });
    } 
    catch (err) {
        next(err);    
    }
}

const login = async (req, res, next) => {
    try {
        const {user_email, user_password} = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (checkUser.rows.length === 0) {
            const error = new Error("Account does not exist!");
            error.statusCode = 401;
            throw error;
        }

        const valid_password = await bcrypt.compare(
            user_password,
            checkUser.rows[0].user_password        
        )

        if (!valid_password){
            const error = new Error("Invalid Email or Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {id: checkUser.rows[0].user_id},
            process.env.JWT_SECRET,
            {expiresIn: "5h"}
        )

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            token: token,
            user: {
                id: checkUser.rows[0].user_id,
                name: checkUser.rows[0].username
            }
        })

    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    register, 
    login
}