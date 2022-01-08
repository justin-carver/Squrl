// const pbkdf2 = require('pbkdf2');
// const cryptoJs = require('crypto-js');
// const conf = require('./server/conf/server.conf');

import pbkdf2 from "pbkdf2";
import cryptoJs from "crypto-js";

const generateAccessKey = (url) => {
    pbkdf2.pbkdf2(url, 'salt', 1000, 4, 'sha512', (err, derivedKey) => {
        if (err) { throw err }
        else { 
            console.log('derivedKey: ', derivedKey.toString('hex'));
            return derivedKey.toString('hex');
        }        
    });
}

const decryptUrl = (encData, key) => {
    console.log('Decrypted: ', cryptoJs.AES.decrypt(encData, key).toString(cryptoJs.enc.Utf8));
}

const encryptUrl = (url, key) => {
    let iv = cryptoJs.enc.Hex.parse("000102030405060708090a0b0c0d0e0f").toString();
    let encrypted = cryptoJs.AES.encrypt(url, key, {iv: iv});
    console.log('Encrypted: ', encrypted.toString());
    return encrypted;
}

export default {encryptUrl, decryptUrl, generateAccessKey};