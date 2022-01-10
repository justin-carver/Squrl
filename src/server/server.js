
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

app.get('/:urlRoute', (req, res) => {
    const urlRoute = req.params.urlRoute;
    const sessionKey = urlRoute.substring(urlRoute.indexOf('+') + 1, urlRoute.length);
    if (urlRoute.includes('+') && urlRoute.length === 13) { // hard coded: url://{urlRoute} '+' {sessionKey} = length
        if ((urlRoute.match(/\+/g)||[]).length > 1) return;
        if (sessionKey.length) {
            // There appears to be a session key attached. Verifying if this url is in the database?
            Url.findOne({ urlRoute : urlRoute.substring(0, urlRoute.indexOf('+')) }, (err, doc) => {
                if (!doc) { res.sendStatus(404) } //  There are no documents associated with this urlRoute.
                else {
                    // urlRoute does exist, serve redirector with appropriate headers.
                    const nonce = new Entropy({ charset: charset64, bits: conf.bitLength  }).string(); // total: 1e4, risk: 1e6, 
                    res.setHeader("Content-Security-Policy", `object-src 'none'; script-src 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:; base-uri 'none'`);
                    res.render('redirector', {
                        url : doc.encryptedUrl,
                        key : sessionKey,
                        nonce : nonce
                    });
                    // Client will worry about decrypting and redirecting.
                    console.log(`Redirecting user for client-side decryption... god speed ${req.socket.remoteAddress}! o7`);
                }
            }).catch(e => {
                console.log('Exception:', e);
            });
        } else {
            // There is no session key appended, but prompt for password screen!
            // Component may need to be created.
        }
    } else {
        res.sendStatus(406);
    }
});

app.post('/decrypt-url', (req, res) => {
    Url.findOne({ urlRoute : req.body.urlRoute, sessionKey : req.body.sessionKey }, (err, doc) => {
        if (!doc) { res.sendStatus(404) }
        else {
            res.setHeader('content-type', 'application/json');
            res.json({
                encryptedUrl : doc.encryptedUrl
            });
        }
    })
});

app.post('/generate-url', (req, res) => {
    const generatedRoute = new Entropy({ charset: charset64, bits: conf.bitLength }).string();
    Url.findOne({
        urlRoute : generatedRoute,
    }, (err, doc) => {
        if (!doc) {
            // Route does not exist! Can create!
            generateUrlDocument(req, res, generatedRoute);
            res.setHeader('content-type', 'application/json');
            res.json({
                urlRoute : generatedRoute
            });
        } else {
            res.sendStatus(409).send('URL route was taken... odds of this happening are very slim.');
        }
    });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.status(404).send('So secure, we can\'t even find it...');
});

const generateUrlDocument = (req, res, generatedRoute) => {
    Url({
        urlRoute : generatedRoute,
        encryptedUrl : req.body.encryptedUrl,
        ipAddress : req.socket.remoteAddress
    }).save().then(dbentry => {
        console.log('Database Entry: ', dbentry, ' saved!');
        // Should receive res.sendStatus(200) automatically.
    }).catch(e => {
        console.log('POST Error:', e);
        res.sendStatus(400);
    });
}

const beginListen = () => {
    app.listen(3000);
}

driver.connectDb(beginListen);