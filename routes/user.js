const express = require('express')
const { GetUsers, CreateUser, Login } = require('../controllers/user')
const router = express.Router()

router.route('/user').get(GetUsers).post(CreateUser)
router.route('/login').post(Login)

module.exports = router