import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { anggaran } from "../types";

export class AnggaranModel {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  // Adds a new record and returns the full object;
  add(values: {
    name: string;
    amount: number;
    period: number;
  }): Promise<anggaran> {
    return this.db.one(
      "insert into anggaran(name, amount, period) values(${name}, ${amount}, ${period}) returning *",
      {
        name: values.name,
        amount: values.name,
        period: values.period,
      }
    );
  }

  // Tries to delete a anggaran by id, and returns the number of records deleted;
  remove(id: number): Promise<number> {
    return this.db.result(
      "DELETE FROM anggaran WHERE id = $1",
      id,
      (r: IResult) => r.rowCount
    );
  }

  // Tries to find a anggaran from id;
  find(anggaranId: number): Promise<anggaran | null> {
    return this.db.oneOrNone(
      "SELECT * FROM anggaran WHERE id = ${anggaranId}",
      {
        anggaranId: anggaranId,
      }
    );
  }

  // Returns all anggaran records;
  all(): Promise<anggaran[]> {
    return this.db.any("SELECT * FROM anggaran");
  }

  // Returns the total amount of anggaran;
  total(): Promise<number> {
    return this.db.one("SELECT sum(amount) FROM anggaran");
  }
}
