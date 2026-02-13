# URL Shortener

A lightweight **RESTful URL Shortener API** built with **Node.js, Express, and MongoDB**, following clean **MVC architecture** and production-ready practices.

## Features

* Generate short URLs using **nanoid**
* Redirect short URL → original URL
* Track visit timestamps
* Input validation & error handling
* Environment configuration via **dotenv**

## Tech Stack

Node.js · Express.js · MongoDB · Mongoose · nanoid · dotenv · nodemon

## Setup

```bash
git clone https://github.com/your-username/url-shortner.git
cd url-shortner
npm install
```

Create `.env`:

```
PORT=8001
MONGO_URL=mongodb://127.0.0.1:27017/url-shortner
```

Run server:

```bash
npm run dev
```

## API

**POST /url**
Create short URL

```json
{ "url": "https://example.com" }
```

**GET /:shortId**
Redirects to original URL and logs visit.

## Author

**Prashant Singh**

## License

MIT
