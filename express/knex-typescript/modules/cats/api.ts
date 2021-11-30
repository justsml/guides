import knex from "../../db/knex"; // TODO: Adjust path as needed!

interface IQueryParameters {
  limit?: number;
  offset?: number;
  orderBy?: [string, "asc" | "desc"] | string[];
}

export default {
  getAll: ({ limit, offset, orderBy }: IQueryParameters = {}) =>
    knex("cats")
      .select("*")
      .limit(limit)
      .offset(offset)
      .orderBy(...orderBy),

  getById: ({ id }: Record<string, unknown> = {}) =>
    knex("cats").select("*").limit(1).where({ id }),
  findOne: (query: Record<string, unknown> = {}) =>
    knex("cats").select("*").limit(1).where(query),
  // TODO: Validate input data
  create: ({ data }: Record<string, unknown> = {}) => knex("cats").insert(data),

  // TODO: Validate input data
  update: ({ id, ...data }: Record<string, unknown> = {}) =>
    knex("cats").where({ id }).update(data),

  // TODO: Check authentication
  remove: ({ id }: Record<string, unknown> = {}) =>
    knex("cats").where({ id }).delete(),
};
