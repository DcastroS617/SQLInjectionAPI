
const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')

const Room = sequelize.define('apartment', {
    RoomID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    RoomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: {
                args: [1, 6],
                msg: 'debe introducir un numero menor a 6 digitos'
            }
        }
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: {
                args: [['san jose', 'alajuela', 'heredia', 'cartago']],
                msg: 'debe ser una provincia del GAM'
            }
        }
    },
    RoomAmount:{
        type: DataTypes.STRING(4),
        allowNull: false,
        validate:{
            isNumeric: {
                args: true,
                msg: 'solo se pueden introducir el numero de cuartos del apartamento'
            },
            notEmpty: true,
            len: [1, 5]
        }
    }
})

module.exports = Room