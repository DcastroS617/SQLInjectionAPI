const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')

const AuthMiddleware = (req, res, next) => {
    const headers = req.headers.authorization
    if(!headers || !headers.startsWith('Bearer')) throw new UnauthorizedError('debes iniciar sesion para continuar', 401)  
    const token = headers.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {Email: payload.email, UserID: payload.UserID, Username: payload.Username}
        next()
    } catch (error) {
        throw new UnauthorizedError('usuario invalido')
    }
    
}

module.exports = AuthMiddleware