const express = require("express");
const cors = require("cors");
const db = require("./db");
const authorize = require("./middleware/authorization.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));

app.use("/api/appointment", require("./routes/appointmentRoutes.js"));

app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

//To know server is running
app.get("/", (req, res) => {
    res.send("Feng Shui Server is Running");
});

//Backend is listen to which PORT 
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

