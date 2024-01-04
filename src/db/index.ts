import pgPromise, { IInitOptions, IDatabase, IMain } from "pg-promise";
import { SakuModel } from "./models/saku";
import { AnggaranModel } from "./models/anggaran";
import { CategoryModel } from "./models/category";

interface IExtensions {
  saku: SakuModel;
  anggaran: AnggaranModel;
  category: CategoryModel;
}

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  extend(obj: ExtendedProtocol) {
    obj.saku = new SakuModel(obj, pgp);
    obj.anggaran = new AnggaranModel(obj, pgp);
    obj.category = new CategoryModel(obj, pgp);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp({
  host: "localhost",
  port: 5432,
  database: "maratus_asli",
  user: "gg",
  password: "rahasia",
  max: 30,
});

// you can get access to pgp via db.$config.pgp
export default db;
