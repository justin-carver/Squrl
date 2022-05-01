# Squrl

Squrl, Secure Quick URL, is a URL shortening service that offers secure 100%, client-side end-to-end encryption.

The goal is to create an application that encrypts all incoming URL data before storing it.

## Stack

This is currently running a solid *MERN* stack, utilizing:

- **MongoDB w/ Mongoose**: Database and driver
- **Express**: Router and API Endpoints
- **React**: w/ TailwindCSS
- **Node**: Back-end

## End-to-End Encryption 🔐

In today's modern age, encryption and privacy must be a golden standard when working with any set of data leaving your network. Current large-scale popular URL shorteners (bit.ly, tinyurl) are a bane to this essential need by allowing third-party companies to gather massive amounts of analytics by using a simple link.

### Encryption

The encryption process is very simple, yet surprisingly robust for what it needs to accomplish. Here is a useful diagram I produced that shows the [encryption/decryption flow (source)](https://i.imgur.com/KpjQUIe.png):

<img src="https://i.imgur.com/KpjQUIe.png" width="50%"/>

Here are the following steps that occur when encrypting the received URL information `(dbinteract.js)`:

1. Using entropy, a [CSPRNG](https://en.wikipedia.org/wiki/Cryptographically-secure_pseudorandom_number_generator) produces a randomized 32-bit session key and is represented as a secret 'passphrase'.
2. Two randomized 128-bit word arrays are generated to comprise both the salt and IV for the initial shared encryption steps.
3. The salt and session key are then both fed into a [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) hashing algorithm to generate a hashed key.
4. The hashed key and plain-text are then fed into the AES-256-CBC encryption algorithm to generate the final encrypted URL to be stored in the database.
   1. The stored encrypted data also contains the salt and IV embedded into itself for easy access in the decryption function.
5. Alongside the encrypted URL, another 32-bit CSPRNG generated key is produced and compared to the current URL route that points to the location of the database entry after verifying it doesn't exist.

During this process, all encryption and decryption happens client-side with the help of local `crypto-js` modules. Absolutely no plain-text information is sent between the server and client. The only connection that is made is it's final query the database to verify the randomly generated route URL has not been taken. If not, we'll store the encrypted URL in the database.

### Decryption

The decryption process is ultimately (as you'd expect) the encryption but reversed. Various checks are performed prior to receiving the encrypted URL from the server, such as verifying the right URL route and session key were provided. The following assumes you have received the encrypted URL ready for ingestion.

1. Load the encrypted URL and session key into decryption function.
2. The PBKDF2 function is performed again, using the same session key and salt (taken from the encrypted source), to generate an exact copy of the original hashed key used in the encryption function.
3. The encrypted URL is then fed into the decryption function, alongside the hashed key, to generate the fully decrypted URL output.

### Redirection

In order to facilitate 100% client-side service, the decryption needs to take place off the server and strictly on the user's machine. For this, the server sends a small `redirector.ejs` file to the client once the correct response has been given. This redirector will initiate the client-side decryption and immediately reroute the user.

This redirect method was chosen to represent a full client-side encryption experience. Direct 301 redirects require the unencrypted destination URL to be known before hand by the server before final jump, which could potentially be unwarrantably stored somewhere else.

## Great Reads

These are some nice articles of information accommodating the reasoning and help for this project:

- [Guess what? URL shorteners short-circuit cloud security](https://arstechnica.com/information-technology/2016/04/guess-what-url-shorteners-short-circuit-cloud-security/)
- [Gone in Six Characters: Short URLs Considered Harmful for Cloud services](https://arxiv.org/pdf/1604.02734v1.pdf)
- [Encryption / Decryption of Data  using PBKDF2 & AES](https://rhamedy.medium.com/encryption-decryption-of-data-based-on-users-password-using-pbkdf2-aes-algorithms-592f8c1bb79a)
- [Small but powerful - Shortened URLs an Attack Vector](https://cofense.com/small-powerful-shortened-urls-attack-vector/)
- [The Secrets in URL Shortening Services](https://www.sans.org/blog/the-secrets-in-url-shortening-services/)

These were some of they *key* ones (get it) that impacted the reasoning for this project. For even more, type in `short url attacks` into Google and you'll get the idea.