
// const rateLimit = require('express-rate-limit'); -- uncomment this if you do not use a conf file
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/squrl.dev/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/squrl.dev/fullchain.pem', 'utf8')
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
});

const credentials = {
    key : privateKey,
    cert : certificate
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Apply the rate limiting middleware to URL generation calls only
// TODO: Display prompt to users who are being rate limited.
app.use(['/generate-url', '/decrypt-url', '/generateSessionKey'], conf.apiLimiter);

app.use(helmet());
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(bodyParser.json({ extended: true }));

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../build/', 'index.html'));
})

app.get('/generateSessionKey', (req, res) => {
    res.send({
        sessionKey : new Entropy({ charset: charset64, bits: 32 }).string()
    });
});

app.get('/:urlRoute', (req, res) => {
    const urlRoute = req.params.urlRoute;
    const sessionKey = urlRoute.substring(urlRoute.indexOf('+') + 1, urlRoute.length);

    if ((urlRoute.match(/\+/g)||[]).length > 1) return;

    if (urlRoute.includes('+') && urlRoute.length === 13) { // hard coded: url: {urlRoute} '+' {sessionKey} = length
        if (sessionKey.length) {
            // There appears to be a session key attached. Verifying if this url is in the database?
            Url.findOne({ urlRoute : urlRoute.substring(0, urlRoute.indexOf('+')) }, (err, doc) => {
                if (!doc) { res.sendStatus(404) }
                else {
                    // urlRoute does exist, serve redirector with appropriate headers.
                    const nonce = new Entropy({ charset: charset64, bits: conf.bitLength  }).string(); // total: 1e4, risk: 1e6, 
                    res.setHeader("Content-Security-Policy", `object-src 'none'; script-src 'nonce-${nonce}' 'strict-dynamic'`);
                    res.render('redirector', {
                        url : doc.encryptedUrl,
                        key : sessionKey,
                        nonce : nonce
                    }, (err, html) => {
                        res.send(html);
                    });
                    // Client will worry about decrypting and redirecting.
                    console.log(`Redirecting user for client-side decryption... god speed! o7`);
                }
            }).clone().catch(function(err){ console.log(err)});
        }
    } else if (urlRoute.length === 6) {
        Url.findOne({ urlRoute : urlRoute }, (err, doc) => {
            if (!doc) { res.sendStatus(404) } //  There are no documents associated with this urlRoute.
            else {
                // If the db entry exists, we'll prompt for a password screen.
                const nonce = new Entropy({ charset: charset64, bits: conf.bitLength  }).string(); // total: 1e4, risk: 1e6, 
                res.setHeader("Content-Security-Policy", `object-src 'none'; script-src 'nonce-${nonce}' 'strict-dynamic'`);
                res.render('password', {
                    nonce : nonce
                }, (err, html) => {
                    res.send(html);
                });
            }
        }).clone().catch(function(err){ console.log(err)});
    // After some deliberation, the info page will not be used. Keeping this here for potential later use.
    // } else if (urlRoute.length === 7 && urlRoute.slice(-1) === '+') {     // Show info page to those who care.
    //     Url.findOne({ urlRoute : urlRoute.substring(0, urlRoute.indexOf('+')) }, (err, doc) => {
    //         if (!doc) { res.sendStatus(404) }
    //         else {
    //             const nonce = new Entropy({ charset: charset64, bits: conf.bitLength  }).string(); // total: 1e4, risk: 1e6, 
    //             res.setHeader("Content-Security-Policy", `object-src 'none'; script-src 'nonce-${nonce}' 'strict-dynamic'`);
    //             res.render('info', {
    //                 nonce : nonce
    //             }, (err, html) => {
    //                 res.send(html);
    //             });
    //         }
    //     }).clone().catch(function(err){ console.log(err)});
    } else {
        res.sendStatus(406);
    }
});

app.get('*', (req, res) => {
    res.status(404).send('So secure, we can\'t even find it...');
});

app.post('/decrypt-url', (req, res) => {
    // if (req.body.urlRoute !== undefined) {
        Url.findOne({ urlRoute : req.body.urlRoute, sessionKey : req.body.sessionKey }, (err, doc) => {
            if (!doc) { res.sendStatus(404) }
            else {
                res.setHeader('content-type', 'application/json');
                res.json({
                    encryptedUrl : doc.encryptedUrl
                });
            }
        })
    // }
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
            res.sendStatus(409).send('URL route was taken... odds of this happening are very slim.').send(err);
        }
    });
});

const generateUrlDocument = (req, res, generatedRoute) => {
    Url({
        urlRoute : generatedRoute,
        encryptedUrl : req.body.encryptedUrl,
        userAgent : req.get('User-Agent')
    }).save().then(dbentry => {
        console.log('Database Entry: ', dbentry, ' saved!');
    }).catch(e => {
        console.log('POST Error:', e);
        res.sendStatus(400);
    });
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const beginListen = () => {
    httpServer.listen(80, () => {
        console.log('Server has started on port 80!');
    });
    httpsServer.listen(443, () => {
        console.log('Server has started on port 443!');
    });
}

driver.connectDb(beginListen);
