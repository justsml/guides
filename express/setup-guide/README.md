# Quickly Setup an Express Server
## In only 3 steps!

### What's included?

* RESTful **express server** with **less cruft** than any 'generator'.
* **Includes optimized defaults:** CORS, logging & error handling!

> Setup Options:

1. [Video](#video): 'Live coding' getting setup - ~2 min.
1. [Cheat](#cheat): tl;dr automated shell script
1. [Instructions](#instructions): 3 manual steps

### Video

[Watch Video on @justsml's Channel](https://www.youtube.com/watch?v=3pMLGK_EKxE)

[![Watch Video on @justsml's Channel](https://img.youtube.com/vi/3pMLGK_EKxE/0.jpg)](https://www.youtube.com/watch?v=3pMLGK_EKxE)

### Cheat

2 shell scripts for the impatient: an express `app.js` generator `~/express-setup.sh`. And a route generator, with multiple choice and naming `~/express-create-route.sh`.

> RECOMMENDED: Create an empty folder for your express server & `cd <server-path>` into it before running the script.

#### Download scripts:

```sh
# Download script to create an app.js
curl -o- -L https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/scripts/express-setup.sh > ~/express-setup.sh
# Download script to add a route (will prompt user for route name & template type)
curl -o- -L https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/scripts/express-create-route.sh > ~/express-create-route.sh
# Set permission
chmod a+x ~/express-*.sh
```

#### Usage:

You're now setup with 2 local scripts. Each time you want to create an app, run the following commands:

```js
# create a director, cd into it
mkdir ~/my-app
cd ~/my-app

# Create the app.js (once)
~/express-setup.sh
# Add a route (as many times as needed)
~/express-create-route.sh
```

##### :tada: [Jump to # 3d to complete adding route(s)](#3d-enable-routes-in-appjs) in `app.js`!


### Manual Instructions

1. [Install NPM Packages](#1-install-npm-packages)
2. [Copy `app.js` into your project](#2-copy-appjs-into-your-project)
3. [Create Express Router Module\(s\)](#3a-d-create-express-router-modules)


#### 1. Install NPM Packages

```sh
# In folder w/ package.json:
npm install express cors body-parser morgan nodemon
```

#### 2. Copy `app.js` into your project

[Get the `app.js` file](./app.js) and copy it to your project.

#### 3a-d. Create Express Router Module(s)

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

1. [Postgres/Knex](./routes/template-postgres-knex.js)
1. [MongoDB/Monk](./routes/template-mongodb-monk.js)
1. [In-memory array (testing)](./routes/template-in-memory-array.js)

Template will contain a placeholder variable `items` - search & replace using the route (table or model) name.

So the variable names should become `item`->`dog` or `item`->`cat`. (**Note:** singular name used - plural names will be included in replace)


> Check for template- or database-specific TODO comments in route files.

##### 3d. Enable Routes in `app.js`

Add your routes to `app.js` with code like:

```js
app.use('/api/cat', require('./routes/cat'))
app.use('/api/dog', require('./routes/dog'))
```

Or with ES6 Modules:

```js
import cat from './routes/cat'
import dog from './routes/dog'

// custom routes go after cors, logging, auth, etc. middleware:
app.use('/api/cat', cat)
app.use('/api/dog', dog)
```

### IMPORTANT:

It is critical your custom routes are followed by the '*notFound*' handler `app.use(notFound)` and '*errorHandler*'.


## Up and Running

Add a `start` script to your `package.json`:

```js
  "start": "node app.js",
  "start:dev": "nodemon app.js"
```

Then start the server via terminal:

```sh
npm start
# Or
npm run start:dev
```

## Verify Server

Server will print the port it's listening on (default is 3000).

Override the port using the PORT environment variable:

```sh
# Optionally set PORT:
PORT=5000 npm run start:dev
```

Use your browser or Postman to GET [http://localhost:3000/api/cat](http://localhost:3000/api/cat)

You should see a corresponding `GET` or `200` status code in the terminal window running your server.


----------
> **WARNING:** CORS is configured to allow any website to make requests.

> In production, the `origin` option should be configured with the permitted domain name(s). To fix, update `app.js` to use an exact domain, e.g.: `app.use(cors({origin: 'shop.securesite.com'}))`)
