import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { category } from "../types";

export class CategoryModel {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  // Adds a new record and returns the full object;
  add(values: { name: string; amount: number }): Promise<category> {
    return this.db.one(
      "insert into category(name, amount) values(${name}, ${amount}) returning *",
      {
        name: values.name,
        amount: values.name,
      }
    );
  }

  // Tries to delete a category by id, and returns the number of records deleted;
  remove(id: number): Promise<number> {
    return this.db.result(
      "DELETE FROM category WHERE id = $1",
      id,
      (r: IResult) => r.rowCount
    );
  }

  // Tries to find a category from id;
  find(categoryId: number): Promise<category | null> {
    return this.db.oneOrNone(
      "SELECT * FROM category WHERE id = ${categoryId}",
      {
        categoryId: categoryId,
      }
    );
  }

  // Returns all category records;
  all(): Promise<category[]> {
    return this.db.any("SELECT * FROM category");
  }

  // Returns the total amount of category;
  total(): Promise<number> {
    return this.db.one("SELECT sum(amount) FROM category");
  }
}
