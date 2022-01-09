const cryptoJs = require('crypto-js');
const validUrl = require('valid-url');
const { Entropy, charset64 } = require('entropy-string');

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
        await fetch('/generate-url/', requestOptions).then((res) => res.json()).then(json => {
            document.querySelector('#output').value = `https://squrl.dev/${json.urlRoute}`;
        }).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    } else {
        document.querySelector('.Squrl__url-form--error').innerHTML = "Please enter a valid URL.";
    }
}

// RFC 4648 compatible (URL friendly!)
const generateSessionKey = () => {
    const entropy = new Entropy({ total: 1e6, risk: 1e9, charset: charset64 });
    return entropy.string();
}

const encryptUrl = (encData, pass) => {
    let salt = cryptoJs.lib.WordArray.random(128/8);
    let iv = cryptoJs.lib.WordArray.random(128/8);

    var key = cryptoJs.PBKDF2(pass, salt, {
        keySize: 256/32,
        iterations: 100
    });
    
    let encrypted = cryptoJs.AES.encrypt(encData, key, { 
        iv: iv, 
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC  
    });

    let url = salt.toString() + iv.toString() + encrypted.toString();
    return url;
}

const decryptUrl = (url, pass) => {
    let salt = cryptoJs.enc.Hex.parse(url.substr(0, 32));
    let iv = cryptoJs.enc.Hex.parse(url.substr(32, 32));
    let encrypted = url.substring(64);
    
    var key = cryptoJs.PBKDF2(pass, salt, {
        keySize: 256 / 32,
        iterations: 100
    });

    let decrypted = cryptoJs.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC
    })
    return decrypted;
}

export { parseUrl, generateSessionKey, decryptUrl, encryptUrl };