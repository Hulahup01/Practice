const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Tag = require('./tag.entity');

const Meetup = sequelize.define('meetup', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    time: {
        type: DataTypes.DATE,
        allowNull: false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const MeetupTag = sequelize.define('meetup_tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false
});

Meetup.belongsToMany(Tag, {through: MeetupTag});
Tag.belongsToMany(Meetup, {through: MeetupTag});

module.exports = Meetup