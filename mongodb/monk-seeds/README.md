## Example Seeds Pattern for MongoDB and Monk

#### Recommended File/Folder Setup:

##### `db/connection.js`

```js
const uri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/testApp';
const db = require('monk')(uri.replace('mongodb://', ''))

db
  .then(console.info.bind(console, 'mongodb successfully connected:'))
  .catch(console.error.bind(console, 'mongodb connection error:'));

module.exports = {
  db: db,
  done: () => db.close(),
};
```

##### `db/models.js`

```js
const {db} = require('./connection');

module.exports = {
  Category: db.get('category'),
  Article:  db.get('article'),
};
```

#### Example `db/seeds.js`

```js
const monk = require('monk');
const ObjectId = (id) => monk.id(id);
const {
  Category,
  Article
} = require('./models');

const techId = ObjectId()

const data = {
  categories: [{_id: techId, name: 'Tech'}]
  articles: [{title: 'Blah blah bitcoin', category: techId}]
}

Promise.all([
// Step #1, delete ALL from each collection
  Category.remove({}),
  Article.remove({}),
])
.then(() => {
  return Promise.all([
    Category.insert(data.categories),
    Article.insert(data.articles),
  ])
})
```

## Setup Run Script

Add a `db:seed` key to your `package.json` scripts section:

```js
  "scripts": {
    "db:seed": "node ./db/seeds.js",
    "test": "mocha"
  }
```

To seed your mongodb, run this:

```sh
npm run db:seed
```
