// DB parsing should be moved into a seperate file, not in component.
const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }
};

const parseUrl = async () => {
    if (document.querySelector('#url').value !== "") {
        requestOptions.body = JSON.stringify({
            encryptedUrl : document.querySelector('#url').value
        });
        await fetch('/generate-url/', requestOptions).then(res => {
            console.log('Genereted db entry.');
        }).catch(e => {
            console.log('Failed to retrieve information from url: ', e);
        });
    }
}

export default parseUrl;