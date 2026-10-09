import { Query } from "mongoose";

export class ApiFeatures {
  public mongooseQuery: Query<any, any>;
  private queryString: Record<string, any>;

  constructor(
    mongooseQuery: Query<any, any>,
    queryString: Record<string, any>,
  ) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  public skip(_offset?: number): this {
    const offset = this.queryString["offset"] ?? _offset ?? 0;
    this.mongooseQuery = this.mongooseQuery.skip(parseInt(offset, 10));
    return this;
  }

  public limit(_limit?: number): this {
    const limit = this.queryString["limit"] ?? _limit ?? 10;
    this.mongooseQuery = this.mongooseQuery.limit(parseInt(limit, 10));
    return this;
  }

  public select(_fields?: string[]): this {
    let fields = this.queryString["select"] ?? _fields ?? [];
    if (typeof fields === "string") {
      fields = [fields];
    }

    if (fields.length > 0) {
      this.mongooseQuery = this.mongooseQuery.select(fields.join(" "));
    }
    return this;
  }

  public filter(): this {
    const queryObj = { ...this.queryString };
    const nonQueryFields = ["select", "sort", "limit", "offset"];
    const excludedQueryObj = Object.keys(queryObj)
      .filter((key) => !nonQueryFields.includes(key))
      .reduce((acc: Record<string, any>, key) => {
        acc[key] = queryObj[key];
        return acc;
      }, {});

    for (const key of Object.keys(excludedQueryObj)) {
      const match = key.match(/^(\w+)(\[(gte|gt|lte|lt|eq|ne)\])?$/);

      if (match) {
        const field = match[1] ?? "";
        const operator = match[3] as
          | "gte"
          | "gt"
          | "lte"
          | "lt"
          | "eq"
          | "ne"
          | undefined;

        if (field) {
          const query = this.mongooseQuery.where(field) as Query<any, any>;

          if (operator) {
            switch (operator) {
              case "gte":
                this.mongooseQuery = query.gte(excludedQueryObj[key]);
                break;
              case "gt":
                this.mongooseQuery = query.gt(excludedQueryObj[key]);
                break;
              case "lte":
                this.mongooseQuery = query.lte(excludedQueryObj[key]);
                break;
              case "lt":
                this.mongooseQuery = query.lt(excludedQueryObj[key]);
                break;
              case "eq":
                this.mongooseQuery = query.equals(excludedQueryObj[key]);
                break;
              case "ne":
                this.mongooseQuery = query.ne(excludedQueryObj[key]);
                break;
              default:
                this.mongooseQuery = query.equals(excludedQueryObj[key]);
            }
          } else {
            this.mongooseQuery = query.equals(excludedQueryObj[key]);
          }
        }
      }
    }

    return this;
  }
}
