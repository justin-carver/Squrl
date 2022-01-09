
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const driver = require('./driver');
const rfs = require('rotating-file-stream');
const path = require('path');
const Url = require('./models/url');
const bodyParser = require('body-parser');
const { Entropy, charset64 } = require('entropy-string');
const conf = require('./conf/server.conf');
const app = express();
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs')
})
// Apply the rate limiting middleware to URL generation calls only
app.use('/generate-url', conf.apiLimiter);

app.use(helmet());
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(bodyParser.json({ extended: true }));
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/', 'index.html'));
})

// ! Append sessionKey to generate-url to prevent outside post requests.
app.post('/generate-url', (req, res) => {
    const generatedRoute = new Entropy({ total: 1e3, risk: 1e9, charset: charset64 }).string();
    console.log(generatedRoute);
    Url.find({
        urlRoute : generatedRoute,
    }, (err, docs) => {
        if (!docs.length) {
            // Route does not exist! Can create!
            generateUrlDocument(req, res, generatedRoute);
            res.setHeader('content-type', 'application/json');
            res.json({
                urlRoute : generatedRoute
            });
            // res.send();
        } else {
            console.log('Did find a doc!: ', docs);
        }
    });
});

const generateUrlDocument = (req, res, generatedRoute) => {
    Url({
        urlRoute : generatedRoute,
        encryptedUrl : req.body.encryptedUrl,
        ipAddress : req.socket.remoteAddress
    }).save().then(dbentry => {
        console.log('Database Entry: ', dbentry, ' saved!');
        // res.sendStatus(200);
    }).catch(e => {
        console.log('POST Error:', e);
        // res.sendStatus(400);
    });
}

// const generateRoute = async () => {
//     let entropy = new Entropy({ total: 1e3, risk: 1e9, charset: charset64 });
//     Url.exists({ urlRoute : entropy }, (err, result) => {
//         if (result) {
//             console.log('Oh... it does exist... awkward.');
//             generateRoute();
//         } else {
//             console.log('Nope! Doesnt exist. Heres the entropy string!');
//             return entropy.string();
//         }
//     });
// }

const beginListen = () => {
    app.listen(3000);
}

driver.connectDb(beginListen);

