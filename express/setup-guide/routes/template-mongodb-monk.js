// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
// RESTful Router Template:
const router = module.exports = require('express').Router();

// IMPORTANT: CHECK `TODO` NOTICES BELOW!!!

// TODO: Move data layer to different module
const connString = 'localhost/mydb' // TODO: Add env vars
const db = require('monk')(connString)
const items = db.get('items') // TODO: move, roughly like: app/db/items.js:

router.get('/',       getAll)
router.get('/:id',    getOne)
router.post('/',      create)
router.put('/:id',    update)
router.delete('/:id', remove)

// IMPORTANT: Don't forget data validation, restrictions
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
  // Basic parameter limiting example (w/ destructuring):
  // const { brand, name } = req.body
  // if (!brand || !name) return next({ status: 400, message: 'Could not create new item.' })
  items.insert(req.body)
    .then(() => res.status(201).json({ message: 'Success', data: req.body }))
    .catch(next)
}

function update(req, res, next) {
  const { id } = req.params
  items.findOneAndUpdate({_id: id}, req.body)
    .then(() => res.status(200).json({ message: 'Success', data: req.body }))
    .catch(next)
}

function remove(req, res, next) {
  items.findOneAndDelete({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Removed'}))
    .catch(next)
}
