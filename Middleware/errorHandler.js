const { Constants } = require("../constants");
const errorHandler = (err, req, res, next) => {

    statusCode = err.statusCode ? err.statusCode : 500;

    switch (statusCode) {

        case Constants.NOT_FOUND:
            return res.json({
                title: "Resource Not Found",
                message: err.message,
                stack: err.stack
            })

        case Constants.VALIDATION_ERROR:
            return res.json({
                title: "validation Error",
                message: err.message,
                stack: err.stack
            });

        case Constants.FORBIDDEN:
            return res.json({
                title: "Forbidden",
                message: err.message,
                stack: err.stack,
            })

        case Constants.UNAUTHORIZED:
            return res.json({
                title: "Un Authorized",
                message: err.message,
                stack: err.stack
            })
        case Constants.SERVER_ERROR:
            return res.json({
                title: "Server Error",
                message: err.message,
                stack: err.stack
            })

        default:
            console.log("No Error! All Good");
            break;
    }
}
module.exports = { errorHandler }