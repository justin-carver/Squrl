# Squrl
Squrl, Secure Quick URL, is a URL shortening service that offers secure end-to-end encryption.

## Stack
This is currently running a solid *MERN* stack, utilizing: 
- **MongoDB**: Client-side File Level Encryption & Redirect Collection
- **Express**: Router and API Endpoint
- **React**: Front-End w/ TailwindCSS
- **Node**: Back-End

## End-to-End Encryption 🔐
In today's modern age, encryption and privacy must be a golden standard when working with any set of data leaving your network. Current large-scale popular URL shorteners (bit.ly, tinyurl) are a bane to this essential need by allowing third-party companies to gather massive amounts of analytics by using a simple link.

With Squrl, to start, the current node server should be configured in the following setup:

### Transport Security

- [ ] All core dependencies should be up to date.
- [ ] Node server should be hosted on a machine that supports SSL/TLS 1.3
  - [ ] SSL certs will need to be generated from a root CA.
- [ ] Utilize [Helmet](https://www.npmjs.com/package/helmet) when spinning up Express.
- [ ] Configure appropriate secure session cookies.

At this point, secure communications can occur to and from the server. The server is running on a strict HTTPS Transport mode and should be relatively secured. More steps should be taken to further protect the web server, but this is a start. 

### Database Security

- [ ] [Client-side Field Level Encryption](https://docs.mongodb.com/manual/core/security-client-side-encryption/) for MongoDB should be configured with appropriate settings for either deterministic or randomized generation.

