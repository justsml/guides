// CHECK `TODO` NOTICES BELOW FILE!!!

// TODO: Update Move data layer out of here
const connString = 'localhost/mydb' // TODO: Add env vars
const db = require('monk')(connString)

// TODO: move following to something like: app/db/items.js:
const items = db.get('items')
items.index('name first last email')
// incl: module.exports = items
/// end app/db/items.js ^^^

// RESTful Router Template:
const router = module.exports = require('express').Router();

router.get('/',       getAll)
router.get('/:id',    getOne)
router.post('/',      create)
router.put('/:id',    update)
router.delete('/:id', remove)

  // TODO: Don't forget data validation, restrictions
  // - use mongoose, Joi, bookshelf, *schema lib, etc.

function getAll(req, res, next) {
  items.find({})
    .then(items => res.status(200).send({data: items}))
    .catch(next)
}

function getOne(req, res, next) {
  items.findOne({id: req.params.id})
    .then(item => {
      if (!item) return res.status(404).send({message: 'Item not found.' })
      res.status(200).send({data: item})
    })
    .catch(next)
}
function create(req, res, next) {
  // const { brand, name } = req.body
  // if (!brand || !name) return next({ status: 400, message: 'Could not create new item.' })
  items.insert(req.body)
    .then(() => res.status(201).json({ data: req.body }))
    .catch(next)
}

function update(req, res, next) {
  const { id } = req.params
  items.findOneAndUpdate({id}, req.body)
    .then(() => res.status(200).json({ data: req.body }))
    .catch(next)
}

function remove(req, res, next) {
  items.findOneAndDelete({id: req.params.id})
  .then(() => res.status(204).json())
  .catch(next)
}
