// credit: https://github.com/justsml/guides/tree/master/express/setup-guide
import express, { Request, Response, NextFunction } from "express";
import cats from "./api";
import { getQueryOptions } from "../../utils/route-utils";

const router = express.Router();

export default router
  .get("/", getAll)
  .post("/", create)
  .get("/:id", getById)
  .put("/:id", update)
  .delete("/:id", remove);

// TODO: Add data validation before inserting into database! Examples: regex, mongoose, Zod, bookshelf, JSON Schema, etc.

function getAll(request: Request, response: Response, next: NextFunction) {
  const { limit, offset, orderBy } = getQueryOptions(request.query);
  cats
    .getAll({ limit, offset, orderBy })
    .then((cats) => response.status(200).send({ data: cats }))
    .catch(next);
}

function getById(request: Request, response: Response, next: NextFunction) {
  cats
    .getById(request.params.id)
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
