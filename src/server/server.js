const express = require('express');
const morgan = require('morgan');
const driver = require('./driver');
const rfs = require('rotating-file-stream');
const app = express();
const path = require('path');
const Url = require('./models/url');
const bodyParser = require('body-parser');

// TODO: Implement Helmet.
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(bodyParser.json({ extended: true }));

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs')
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/', 'index.html'));
})

app.post('/generate-url', (req, res) => {
    Url({
        encryptedUrl : req.body.encryptedUrl,
        ipAddress : req.socket.remoteAddress
    }).save().then(dbentry => {
        console.log('Database Entry: ', dbentry, ' saved!');
    });
    res.sendStatus(200);
});

const beginListen = () => {
    app.listen(3000);
}

driver.connectDb(beginListen);

