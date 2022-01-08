const validUrl = require('valid-url');

const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
};

const parseUrl = async () => {
    // query selectors need to be in exported function
    if (document.querySelector('#url').value !== "" && validUrl.isWebUri(document.querySelector('#url').value)) {
        document.querySelector('.Squrl__url-form--error').innerHTML = "";
        requestOptions.body = JSON.stringify({
            encryptedUrl : document.querySelector('#url').value
        });
        await fetch('/generate-url/', requestOptions).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    } else {
        document.querySelector('.Squrl__url-form--error').innerHTML = "Please enter a valid URL.";
    }
}

export default parseUrl;