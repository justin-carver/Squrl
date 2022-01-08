const crypto = require('crypto-browserify');


const defaultBits = 128;
const defaultRadix = 16;
const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

const rand = (bits, radix) => {
    bits = bits || defaultBits;
    radix = radix || defaultRadix;
    
    if (radix < 2 || radix > 36) {
        throw new Error('Radix argument must be between 2 and 36!');
    }

    let length = Math.ceil(bits * Math.log(2) / Math.log(radix));
    let entropy = crypto.randomBytes(bits);
    // let stream = sequin(entropy);
    let hexString = '';

    while (hexString.length < length) {
        // hexString += digits[stream.generate(radix)];
    }

    return hexString;
}

module.exports = rand;