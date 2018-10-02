# Quickly Setup an Express Server
## In only 3 steps!

[Watch Video on @justsml's Channel](https://www.youtube.com/watch?v=3pMLGK_EKxE)
[![Watch Video on @justsml's Channel](https://img.youtube.com/vi/3pMLGK_EKxE/0.jpg)](https://www.youtube.com/watch?v=3pMLGK_EKxE)

> Setup an **express server** with **less cruft** than any 'generator'.

>**Includes optimized defaults: CORS, logging & error handling!**

1. [Install NPM Packages](#1-install-npm-packages)
2. [Copy `app.js` into your project](#2-copy-appjs-into-your-project)
3. [Create Express Router Module\(s\)](#3a-d-create-express-router-modules)


### 1. Install NPM Packages

```sh
# In folder w/ package.json:
npm install express cors body-parser morgan nodemon
```

### 2. Copy `app.js` into your project

[Get the `app.js` file](./app.js) and copy it to your project.

### 3a-d. Create Express Router Module(s)

**This is the preferred way to implement paths like `/api/dog/` and `/api/cat/`.**

##### 3a. Create a folder `routes`.

```sh
mkdir routes
```

##### 3b. Create a JS file for each route (path) in your API.

For example, if your URLs will include `/api/dog/` and `/api/cat/`, create 2 router files: `/routes/dog.js` and `/routes/cat.js`.

```sh
touch ./routes/{dog,cat}.js
```

Copy & Paste a router template into your router `.js` files...

##### 3c. Copy router template (by database/storage tech):

1. [Postgres/Knex](./routes/rest-with-knex.js)
1. [MongoDB/Monk](./routes/rest-mongodb-with-monk.js)
1. [In-memory array (testing)](./routes/rest-arrays-template.js)

Template will contain a placeholder variable `items` - search & replace using the route (table or model) name.

So the variable names should become `item`->`dog` or `item`->`cat`. (**Note:** singular name used - plural names will be included in replace)


> Check for template- or database-specific TODO comments in route files.

##### 3d. Enable Routes in `app.js`

Add your routes to `app.js` with code like:

```js
app.use('/api/cat', require('./routes/cat'))
app.use('/api/dog', require('./routes/dog'))
```


### IMPORTANT:

It is critical routes are added before the '*notFound*' handler `app.use(notFound)`.


## Up and Running

Add a `start` script to your `package.json`:

```js
  "start": "nodemon app.js"
```

Or start the server via terminal:

```sh
node app.js
```

## Verify Server

Server will print the port it's listening on (default is 3000).

Use browser or Postman to GET [http://localhost:3000/api/cat](http://localhost:3000/api/cat)

You should see a corresponding `GET` or `200` status code in the terminal window running your server.


----------
> **WARNING:** CORS is configured to allow any website to make requests.

> In production, the `origin` option should be configured with the permitted domain name(s). To fix, update `app.js` to use an exact domain, e.g.: `app.use(cors({origin: 'shop.securesite.com'}))`)
