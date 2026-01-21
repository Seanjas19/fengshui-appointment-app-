const errorMiddleware = (err, req, res, next) => {
    console.error("---ERROR LOG---");
    console.error(err.stack); 

    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
};

module.exports = errorMiddleware;