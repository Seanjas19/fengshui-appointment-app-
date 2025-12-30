const jwt = require("jsonwebtoken");
require("dotenv").config();

//Authorization function act as a Bounder
module.export = async (req, res, next) => {
    
    try{

        const jwt_token = req.header("token");

        if (!jwt_token) {
            return res.status(403).json({message: "Unauthorized!"});
        }

        const payload = jwt.verify(jwt_token, process.env.JWT_SECRET);

        req.user = payload.id;
        
        next();
    }
    catch (err) {
        console.error(err.message);
        return res.status(403).json({message: "Token is invalid!"});
    }
}