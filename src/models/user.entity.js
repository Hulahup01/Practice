const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

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

module.exports = User;
