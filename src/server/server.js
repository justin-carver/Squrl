const express = require('express');
const driver = require('./driver');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../../build/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/', 'index.html'));
})

const beginListen = () => {
    app.listen(3000);
}

driver.connectDb(beginListen);

