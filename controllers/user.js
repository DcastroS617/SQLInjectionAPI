const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const NotFoundError = require('../errors/NotFoundError')
const jwt = require('jsonwebtoken')

const CreateUser = async (req, res) => {
    const user = await UserModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({user})
}

const GetUsers = async (req, res) => {
    const users = await UserModel.findAll({attributes: ['Username', 'Email']})
    return res.status(StatusCodes.OK).json({users})
}

const Login = async (req, res) => {
    const {body: {Username, Password}} = req
    const user = await UserModel.findOne({ where: {Username: Username}})
    if(!user) throw new NotFoundError('el nombre de usuario no se encuentra registrado...')
    const validatePassword = await bcrypt.compare(Password, user.Password)
    if(!validatePassword) throw new NotFoundError('La contrasenia es incorrecta...')
    const token = jwt.sign({UserID: user.UserID, Username, Email: user.Email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return res.status(StatusCodes.ACCEPTED).json({user: user.Username, token})
}

module.exports = {
    CreateUser,
    GetUsers,
    Login
}