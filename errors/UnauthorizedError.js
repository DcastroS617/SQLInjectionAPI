const { StatusCodes } = require("http-status-codes")

class UnauthorizedError extends Error{
    constructor(message, code) {
        super(message)
        this.code = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError