## Example Seeds Pattern for Mongodb/Mongoose

#### Example Schemas:

##### `models.js`

```js
const mongoose = require('mongoose');

// Category Schema
const category = mongoose.Schema({
  name: {type: String, unique: true},
});

// Articles schema
const article = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: String
});

mongoose.model('Article', article);
mongoose.model('Category', category);

module.exports = {article, category};
```

#### Example `seeds.js`

```js
const ObjectId = mongoose.ObjectId;
const Category = require('mongoose').model('Category');
const Article  = require('mongoose').model('Article');

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




