import type { Query } from "mongoose";

type QueryParams =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

const FILTER_EXCLUDED_PARAMS = new Set([
  "limit",
  "skip",
  "select",
  "page",
  "sort",
]);

export class ApiFeatures<ResultType, DocType> {
  constructor(
    public query: Query<ResultType, DocType>,
    private readonly queryParams: QueryParams,
  ) {}

  filter() {
    const entries =
      this.queryParams instanceof URLSearchParams
        ? Array.from(this.queryParams.entries())
        : Object.entries(this.queryParams).filter(
            (entry): entry is [string, string | string[]] =>
              entry[1] !== undefined,
          );
    const filters = Object.fromEntries(
      entries.filter(([key]) => !FILTER_EXCLUDED_PARAMS.has(key)),
    );

    if (Object.keys(filters).length > 0) {
      this.query.find(filters);
    }

    return this;
  }

  limit() {
    const value = this.getParam("limit");
    if (value !== undefined) {
      this.query = this.query.limit(this.parseInteger("limit", value, 1));
    }

    return this;
  }

  skip() {
    const value = this.getParam("skip");
    if (value !== undefined) {
      this.query = this.query.skip(this.parseInteger("skip", value, 0));
    }

    return this;
  }

  select() {
    const value = this.getParam("select");
    if (value !== undefined) {
      const fields = value
        .split(",")
        .map((field) => field.trim())
        .filter(Boolean)
        .join(" ");

      if (fields) {
        this.query = this.query.select(fields);
      }
    }

    return this;
  }

  private getParam(key: string) {
    if (this.queryParams instanceof URLSearchParams) {
      return this.queryParams.get(key) ?? undefined;
    }

    const value = this.queryParams[key];
    return Array.isArray(value) ? value.join(",") : value;
  }

  private parseInteger(key: string, value: string, minimum: number) {
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < minimum) {
      throw new RangeError(
        `"${key}" must be an integer greater than or equal to ${minimum}.`,
      );
    }

    return parsed;
  }
}
