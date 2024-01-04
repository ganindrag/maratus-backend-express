import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { saku } from "../types";

export class SakuModel {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  // Adds a new record and returns the full object;
  add(values: { name: string; amount: number }): Promise<saku> {
    return this.db.one(
      "insert into saku(name, amount) values(${name}, ${amount}) returning *",
      {
        name: values.name,
        amount: values.name,
      }
    );
  }

  // Tries to delete a saku by id, and returns the number of records deleted;
  remove(id: number): Promise<number> {
    return this.db.result(
      "DELETE FROM saku WHERE id = $1",
      id,
      (r: IResult) => r.rowCount
    );
  }

  // Tries to find a saku from id;
  find(sakuId: number): Promise<saku | null> {
    return this.db.oneOrNone("SELECT * FROM saku WHERE id = ${sakuId}", {
      sakuId: sakuId,
    });
  }

  // Returns all saku records;
  all(): Promise<saku[]> {
    return this.db.any("SELECT * FROM saku");
  }

  // Returns the total amount of saku;
  total(): Promise<number> {
    return this.db.one("SELECT sum(amount) FROM saku");
  }
}
