const { Sequelize } = require('sequelize');

//module.exports = new Sequelize('postgresql://postres:ZwQKXqlnMw8pHLooDa7s8DBKqHeNkXrP@dpg-cpuqkg2j1k6c738g39c0-a/meetup_api_db');
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB,
        host: process.env.DB_HOST,
        port: process.env.DB_POST,
    }
);