export function getQueryOptions(
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
  offset = Math.abs(parseInt(`${offset}`, 10));
  limit = Math.abs(parseInt(`${limit}`, 10));
  const orderByPair =
    orderBy[0] === "-" ? [orderBy.slice(1), "desc"] : [orderBy, "asc"];
  offset = offset > 100000 ? 100000 : offset;
  limit = limit > 100 ? 100 : limit;
  return { offset, limit, orderBy: orderByPair };
}
