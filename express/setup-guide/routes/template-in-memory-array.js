// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
const router = module.exports = require('express').Router();

const items = [] // in-memory 'dummy data source'

// Standard CRUD routes:
router.get('/',       getAll)
router.get('/:id',    getOne)
router.post('/',      create)
router.put('/:id',    update)
router.delete('/:id', remove)

function getAll(req, res, next) {
  res.json({ data: items })
}

function getOne(req, res, next) {
  const item = items.find(item => item.id === req.params.id)
  if (!item) return next({ status: 404, message: 'Item not found.' })
  res.status(200).json({ data: item })
}

function create(req, res, next) {
  const data = {...req.body, id: (Math.random() * 1000000)}
  items.push(data)
  res.status(201).json({ data })
}

function update(req, res, next) {
  const { id } = req.params
  const previous = items.findIndex(item => item.id === id)
  if (previous === -1) return next({ status: 404, message: 'Item not found.' })

  items[previous] = { id: items[previous].id, brand, name }
  res.status(200).json({ data: items[previous] })
}

function remove(req, res, next) {
  const { id } = req.params
  const previous = items.findIndex(item => item.id === id)

  if (previous === -1) return next({ status: 404, message: 'Item not found.' })

  items.splice(previous, 1)
  res.status(204).json()
}
