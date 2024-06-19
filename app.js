require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'API'});
});

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
