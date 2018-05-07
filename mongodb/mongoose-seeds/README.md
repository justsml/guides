## Example Seeds Pattern for Mongodb/Mongoose

#### Recommended File/Folder Setup:

##### `db/connection.js`

```js
const uri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/testApp';
const mongoose = require('mongoose');
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', console.info.bind(console, 'mongodb successfully connected:'));

module.exports = {mongoose, db};
```

##### `db/models.js`

```js
const {mongoose, db} = require('./connection');

// Category Schema
const category = mongoose.Schema({
  name: {type: String, unique: true},
});

// Articles schema
const article = mongoose.Schema({
  // Relational lookup field
  category: { ref: 'Category', type: mongoose.Schema.Types.ObjectId },
  title: String
});

mongoose.model('Article', article);
mongoose.model('Category', category);

module.exports = {article, category};
```

#### Example `db/seeds.js`

```js
const {mongoose, db} = require('./connection');
const ObjectId = mongoose.ObjectId;
const Category = mongoose.model('Category');
const Article  = mongoose.model('Article');

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
