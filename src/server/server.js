
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));

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

// Re-direction GET request
app.get('/:urlRoute', (req, res) => {
    const urlRoute = req.params.urlRoute;
    if (urlRoute.includes('+')) {
        // Check if the session key has been applied in the param;
        let sessionKey = urlRoute.substring(urlRoute.indexOf('+') + 1, urlRoute.length);
        if (sessionKey.length) {
            // There appears to be a session key attached. Verifying...
            Url.findOne({ urlRoute : urlRoute.substring(0, urlRoute.indexOf('+')) }, (err, doc) => {
                if (!doc) {
                    res.sendStatus(404);
                } else {
                    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com");
                    res.render('redirector', {
                        url : doc.encryptedUrl,
                        key : sessionKey
                    });
                    console.log(`Redirecting user for client-side decryption... god speed ${req.body.remoteAddress}`);
                }
            })
        } else {
            // There is no session key appended, but prompt for password screen!
            // Component may need to be created.
        }
    }
});

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

const beginListen = () => {
    app.listen(3000);
}

driver.connectDb(beginListen);

