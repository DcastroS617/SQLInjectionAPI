require('dotenv').config()
require('express-async-errors')

const express = require('express')
const { StatusCodes } = require('http-status-codes')
const app = express()

const sequelize = require('./db/sequelize')
sequelize.sync({alter: true})
const ErrorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware')

const RoomRoute = require('./routes/room')
const UserRoute = require('./routes/user')

app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('<p>we up in this b</p>')
})

app.use('/api', RoomRoute)
app.use('/api', UserRoute)

app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 3030

const start = () => {
    try {
        app.listen(port, () => console.log(`server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()