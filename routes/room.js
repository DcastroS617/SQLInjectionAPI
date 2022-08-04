const express = require('express')
const { GetRooms, CreateRoom, GetRoom, UpdateRoom, DeleteRoom } = require('../controllers/room')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.route('/apartments').get(GetRooms).post(AuthMiddleware, CreateRoom)
router.route('/apartments/:id').get(GetRoom).patch(AuthMiddleware, UpdateRoom).delete(AuthMiddleware, DeleteRoom)

module.exports = router