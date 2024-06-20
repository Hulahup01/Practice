require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const status = require('http-status');
const router = require('./routes/index');
const errorHandler = require('./middleware/error-handling.middleware');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(status.OK).json({message: 'API'});
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync().then(() => console.log('Tables have been created'));
        app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
};

start();