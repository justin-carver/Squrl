// Run code to attempt a couple hundred POST requests on server.
// Verify that rateLimiter on ../server/server.js is working properly before prod push.

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const checkRateLimit = async () => {
    console.log('Starting');
    try {
        const decryptUrlOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        for (let x = 0; x < 50; x++) {
            await fetch('http://localhost:3000/decrypt-url', decryptUrlOptions)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                })
                .catch((e) => {
                    console.log('Failed to retrieve information from url: ', e);
                });
        }
    } catch (e) {
        console.log(e);
    }
};

checkRateLimit();
