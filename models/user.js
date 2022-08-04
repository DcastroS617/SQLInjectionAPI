
const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')
const bcrypt = require('bcryptjs')

const User = sequelize.define('user', {
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: {
                args: [6, 16],
                msg: 'Debe introducir un nombre que tenga de 6 a 16 caracteres.'
            },
            isAlphanumeric: {
                args: true,
                msg: 'debe introducir un nombre con numeros y letras!'
            }
        }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: {
                args: [8, 20],
                msg: 'Debe introducir una contrasenha que tenga de 8 a 20 caracteres.'
            },
            isAlphanumeric: {
                args: true,
                msg: 'debe introducir un nombre con numeros y letras!'
            }
        }
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'debes introducir un email'
            },
            notEmpty: true
        }
    }
},
    {
        hooks: {
            beforeCreate: async (user, options) => {
                const salt = await bcrypt.genSalt(10)
                user.Password = await bcrypt.hash(user.Password, salt)
            }
        }
    })
//el hook beforeCreate valida el modelo primero antes de crear un nuevo usuario.
module.exports = User