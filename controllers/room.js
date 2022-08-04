const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/NotFoundError')
const RoomModel = require('../models/room')

const GetRooms = async (req, res) => {
    const rooms = await RoomModel.findAll()
    return res.status(StatusCodes.OK).json({ rooms })
}

const GetRoom = async (req, res) => {
    const {
        params: {
            id
        }
    } = req
    const room = await RoomModel.findByPk(id)
    if (!room) throw new NotFoundError('No se encuentra disponible el cuarto solicitado!, pruebalo con otro...')
    return res.status(StatusCodes.OK).json({ room })
}

const CreateRoom = async (req, res) => {
    console.log(req.body)
    const room = await RoomModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({ room })
}

const UpdateRoom = async (req, res) => {
    const {
        params: {
            id
        }
    } = req
    const room = await RoomModel.update(req.body, {
        where: {
            RoomID: id
        }
    })
    if (!room) throw new NotFoundError('No se encuentra el cuarto a modificar...')
    return res.status(StatusCodes.OK).json({ room })
}

const DeleteRoom = async (req, res) => {
    const {
        params: {
            id
        }
    } = req
    const room = await RoomModel.destroy({
        where: {
            RoomID: id
        }
    })
    if (!room) throw new NotFoundError('No se encuentra el cuarto solicitado...')
    return res.status(StatusCodes.OK).json({ room })
}

module.exports = {
    GetRooms,
    GetRoom,
    CreateRoom,
    UpdateRoom,
    DeleteRoom
}