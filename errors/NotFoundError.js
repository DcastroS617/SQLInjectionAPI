const { StatusCodes } = require("http-status-codes")

class NotFoundError extends Error {
    constructor(message, code){
        super(message)
        this.code = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError