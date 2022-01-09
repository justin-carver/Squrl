const pbkdf2 = require('pbkdf2');
const cryptoJs = require('crypto-js');
const validUrl = require('valid-url');
const { Entropy } = require('entropy-string');

const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
};

const parseUrl = async (sessionKey) => {
    if (document.querySelector('#url').value !== "" && validUrl.isWebUri(document.querySelector('#url').value)) {
        document.querySelector('.Squrl__url-form--error').innerHTML = "";
        requestOptions.body = JSON.stringify({
            encryptedUrl : encryptUrl(document.querySelector('#url').value, sessionKey).toString()
        });
        // Make post request to update db and store encrypted url
        await fetch('/generate-url/', requestOptions).then(() => {
            // Do stuff on completion.
        }).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    } else {
        document.querySelector('.Squrl__url-form--error').innerHTML = "Please enter a valid URL.";
    }
}

const generateSessionKey = () => {
    const entropy = new Entropy({ total: 1e6, risk: 1e9, charset: '0123456789abcdef' });
    // Async pbkdf2 not updating prop in time, have to use sync function.
    const key = pbkdf2.pbkdf2Sync(entropy.string(), 'salt', 1000, 4, 'sha512', (err, derivedKey) => {
        if (err) { throw new Error(err) }
        else { return derivedKey.toString('hex'); }
    });
    // As well, casting to hex string twice for some reason yield correct output.
    return key.toString('hex');
}

const decryptUrl = (encData, key) => {
    let decryptedValue = cryptoJs.AES.decrypt(encData, key).toString(cryptoJs.enc.Utf8);
    console.log(decryptedValue);
    return decryptedValue;
}

const encryptUrl = (url, key) => {
    let encrypted = cryptoJs.AES.encrypt(url, key);
    console.log('Encrypted: ', encrypted.toString());
    return encrypted;
}

export { parseUrl, generateSessionKey, decryptUrl, encryptUrl };