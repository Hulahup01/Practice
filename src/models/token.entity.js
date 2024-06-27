const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Token = sequelize.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false
});

module.exports = Token;