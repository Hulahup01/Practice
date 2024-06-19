require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'API'});
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