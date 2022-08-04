const { StatusCodes } = require("http-status-codes")

const ErrorHandlerMiddleware = (err, req, res, next) => {
    const error = `${err.message}`
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
}

module.exports = ErrorHandlerMiddleware