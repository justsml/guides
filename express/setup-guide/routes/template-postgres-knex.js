// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide

// IMPORTANT: CHECK `TODO` NOTICES BELOW!!!

// `/modules/items/router.{js,ts}`
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

// TODO: Add data validation before inserting into database!
// Examples: regex, mongoose, Joi, bookshelf, JSON Schema, etc.

function getAll(req, res, next) {
  const { limit, offset, orderBy } = getQueryOptions(req.query);
  items
    .getAll({ limit, offset, orderBy })
    .then((items) => res.status(200).send({ data: items }))
    .catch(next);
}
function getById(req, res, next) {
  items
    .getOne(req.params.id)
    .then(([item]) => res.status(200).send({ data: item }))
    .catch(next);
}

function create(req, res, next) {
  items
    .create(req.body)
    .then(() => res.status(201).json({ data }))
    .catch(next);
}

function update(req, res, next) {
  items
    .update({ id: req.params.id, ...req.body })
    .then((count) =>
      count >= 1
        ? res.status(200).json({ data: req.body })
        : res.status(410).json()
    )
    .catch(next);
}

function remove(req, res, next) {
  items
    .remove(req.params.id)
    .then((count) =>
      count >= 1
        ? res.status(204).json()
        : res.status(404).json({ message: "Nothing deleted!" })
    )
    .catch(next);
}

// `/modules/items/api.{js,ts}`
const items = {
  getAll: ({ limit, offset, orderBy } = {}) => knex("items")
      .select("*")
      .limit(limit)
      .offset(offset)
      .orderBy(...orderBy),

  getOne: ({ id } = {}) => knex("items").select("*").limit(1).where({ id }),

  // TODO: Validate input data
  create: ({ data } = {}) => knex("items").insert(data),

  // TODO: Validate input data
  update: ({ id, ...data } = {}) => knex("items").where({ id }).update(data),

  // TODO: Validate authentication
  remove: ({ id } = {}) => knex("items").where({ id }).delete(),
};

// `/utils/router.{js,ts}`
function getQueryOptions(query) {
  let { offset = 0, limit = 20, orderBy = "-id" } = query;
  offset = Math.abs(parseInt(offset, null));
  limit = Math.abs(parseInt(limit, null));
  orderBy = orderBy[0] === "-" ? [orderBy.slice(1), "desc"] : [orderBy, "asc"];
  offset = offset > 100000 ? 100000 : offset;
  limit = limit > 100 ? 100 : limit;
  return { offset, limit, orderBy };
}
