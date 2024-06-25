require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sequelize = require('./src/config/db');
const status = require('http-status');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/error-handling.middleware');
const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
require('./src/middleware/passport.middleware')(passport);

app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(status.OK).json({message: '/API'});
});

const start = () => {
    sequelize.sync().then(r =>  app.listen(PORT));
};

start();