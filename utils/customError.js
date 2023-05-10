const customError = (res, statusCode, message, status = "fail") => {
    res.status(statusCode).json({
        status,
        message,
    });
};

export default customError;
