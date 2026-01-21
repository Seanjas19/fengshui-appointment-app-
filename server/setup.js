const database_tool = require("./db")

async function createTables() {
    try{
        await database_tool.query(
            `CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                user_email VARCHAR(255) UNIQUE NOT NULL,
                user_password VARCHAR(255) NOT NULL,
                user_contact VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log("User Table Created!");

        await database_tool.query(
            `CREATE TABLE IF NOT EXISTS contacts(
                contact_id SERIAL PRIMARY KEY,
                contact_name VARCHAR(255) NOT NULL,
                contact_email VARCHAR(255) NOT NULL,
                contact_phone VARCHAR(255) NOT NULL,
                contact_message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log("Contact Table Created!");

        await database_tool.query(
            `CREATE TABLE IF NOT EXISTS appointments(
                appointment_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id),
                appointment_date DATE NOT NULL,
                service_type VARCHAR(255) NOT NULL,  
                user_message TEXT,
                appointment_status VARCHAR(50) DEFAULT 'confirmed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log("Appointment Table Created!");
    }
    catch (err) {
        console.error("Error creating tables in SQL", err.message);
    }
}

createTables();