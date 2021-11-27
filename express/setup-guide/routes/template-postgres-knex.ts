// credit: https://github.com/justsml/guides/tree/master/express/setup-guide
/*
TODO:
Add the 3 files marked in comments below.
1. Create data module `api.ts`, and express module `router.ts` in an `cats/` folder.
2. Create the `route-utils.ts` file in the `/utils` folder.
*/

// `/modules/cats/router.{js,ts}`
import express, { Request, Response, NextFunction } from "express";
import { getQueryOptions } from "./utils/route-utils";

const router = express.Router();
export default router;

router
  .get("/", getAll)
  .get("/:id", getById)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", remove);

// TODO: Add data validation before inserting into database!
// Examples: regex, mongoose, Joi, bookshelf, JSON Schema, etc.

function getAll(request: Request, response: Response, next: NextFunction) {
  const { limit, offset, orderBy } = getQueryOptions(request.query);
  cats
    .getAll({ limit, offset, orderBy })
    .then((cats) => response.status(200).send({ data: cats }))
    .catch(next);
}
function getById(request: Request, response: Response, next: NextFunction) {
  cats
    .getOne(request.params.id)
    .then(([item]) => response.status(200).send({ data: item }))
    .catch(next);
}

function create(request: Request, response: Response, next: NextFunction) {
  cats
    .create(request.body)
    .then((data) => response.status(201).json({ data }))
    .catch(next);
}

function update(request: Request, response: Response, next: NextFunction) {
  cats
    .update({ id: request.params.id, ...request.body })
    .then((count) =>
      count >= 1
        ? response.status(200).json({ data: request.body })
        : response.status(410).json()
    )
    .catch(next);
}

function remove(request: Request, response: Response, next: NextFunction) {
  cats
    .remove(request.params.id)
    .then((count) =>
      count >= 1
        ? response.status(204).json()
        : response.status(404).json({ message: "Nothing deleted!" })
    )
    .catch(next);
}

// `/modules/cats/api.{js,ts}`
import knex from "../db/knex"; // TODO: Adjust path as needed!

interface IQueryParameters {
  limit?: number;
  offset?: number;
  orderBy?: [string, "asc" | "desc"] | string[];
}

const cats = {
  getAll: ({ limit, offset, orderBy }: IQueryParameters = {}) =>
    knex("cats")
      .select("*")
      .limit(limit)
      .offset(offset)
      .orderBy(...orderBy),

  getOne: ({ id } = {}) => knex("cats").select("*").limit(1).where({ id }),

  // TODO: Validate input data
  create: ({ data } = {}) => knex("cats").insert(data),

  // TODO: Validate input data
  update: ({ id, ...data } = {}) => knex("cats").where({ id }).update(data),

  // TODO: Validate authentication
  remove: ({ id } = {}) => knex("cats").where({ id }).delete(),
};

// `/utils/route-utils.{js,ts}`
function getQueryOptions(
  query: {
    offset?: number;
    limit?: number;
    orderBy?: string;
  },
  { defaultOffset = 0, defaultLimit = 20, defaultOrderBy = "-id" } = {}
) {
  let {
    offset = defaultOffset,
    limit = defaultLimit,
    orderBy = defaultOrderBy,
  } = query;
  offset = Math.abs(parseInt(`${offset}`, null));
  limit = Math.abs(parseInt(`${limit}`, null));
  const orderByPair =
    orderBy[0] === "-" ? [orderBy.slice(1), "desc"] : [orderBy, "asc"];
  offset = offset > 100000 ? 100000 : offset;
  limit = limit > 100 ? 100 : limit;
  return { offset, limit, orderBy: orderByPair };
}
