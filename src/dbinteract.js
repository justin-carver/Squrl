const cryptoJs = require('crypto-js');
const validUrl = require('valid-url');

// Request options separated for flexibility later.
const generateRequestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
};

const decryptUrlOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
}

const parseUrl = async (sessionKey) => {
    if (document.querySelector('#url').value !== "" && validUrl.isWebUri(document.querySelector('#url').value)
    && document.querySelector('#url').value.length <= 2083) {
        document.querySelector('#squrl-error').innerHTML = "";
        generateRequestOptions.body = JSON.stringify({
            encryptedUrl : encryptUrl(document.querySelector('#url').value, sessionKey).toString()
        });
        // Make post request to update db and store encrypted url
        await fetch('/generate-url', generateRequestOptions).then((res) => res.json()).then(json => {
            document.querySelector('#output').value = `https://squrl.dev/${json.urlRoute}+${sessionKey}`;
        }).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    } else if (document.querySelector('#url').value.length > 2083) {
        document.querySelector('#squrl-error').innerHTML = "URL is too long, even for this service.";
    } else {
        document.querySelector('#squrl-error').innerHTML = "Please enter a valid URL.";
    }
}

const encryptUrl = (ptUrl, pass) => {
    let salt = cryptoJs.lib.WordArray.random(128/8);
    let iv = cryptoJs.lib.WordArray.random(128/8);

    var key = cryptoJs.PBKDF2(pass, salt, {
        keySize: 256/32,
        iterations: 4096
    });
    
    let encrypted = cryptoJs.AES.encrypt(ptUrl, key, { 
        iv: iv, 
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC  
    });

    let encryptedUrl = salt.toString() + iv.toString() + encrypted.toString();
    return encryptedUrl;
}

const decryptUrl = (encUrl, pass) => {
    let salt = cryptoJs.enc.Hex.parse(encUrl.substr(0, 32));
    let iv = cryptoJs.enc.Hex.parse(encUrl.substr(32, 32));

    let encrypted = encUrl.substring(64);
    
    var key = cryptoJs.PBKDF2(pass, salt, {
        keySize: 256 / 32,
        iterations: 4096
    });

    let decryptedUrl = cryptoJs.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC
    })
    return decryptedUrl;
}

const getDecryptedUrlFromDb = async () => {
    let decryptedUrl = document.querySelector('#decrypted-url');
    let squrlUrl = document.querySelector('#encrypted-url');
    let key = document.querySelector('#key');

    if (key.value !== "") {
        decryptUrlOptions.body = JSON.stringify({
            urlRoute : squrlUrl.value.split('/')[squrlUrl.value.split('/').length - 1].substring(0, 6),
            sessionKey : key.value
        });
        await fetch('/decrypt-url', decryptUrlOptions).then((res) => res.json()).then(json => {
            decryptedUrl.value = decryptUrl(json.encryptedUrl, key.value).toString(cryptoJs.enc.Utf8);
        }).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    } else {
        document.querySelector('#decrypter-error').innerHTML = "Please enter a valid Session Key or Encrypted URL.";
    }
}

export { getDecryptedUrlFromDb, parseUrl, decryptUrl, encryptUrl };