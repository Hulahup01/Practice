const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Token = require('./token.entity');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('USER', 'ORGANIZER','ADMIN'),
        defaultValue: 'USER'
    }
}, {
    timestamps: false
});

Token.belongsTo(User);
User.hasMany(Token);

module.exports = User;
