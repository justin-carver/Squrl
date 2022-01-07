const mongoose = require('mongoose');
 // Object that contains private server/db connection information.
 // This has been added to the .gitignore.
const conf = require('./conf/server.conf');

const connectDb = (beginListen) => {
    mongoose.connect(conf.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(e => {
        console.log('Succssful connection!', e);
        beginListen();
    }).catch(e => {
        console.log('Error attempting to connect to db: ', e);
    });
}

module.exports = {connectDb};