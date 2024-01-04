export interface master {
  id: number;
  name: string;
}

export type saku = master & {
  amount: number;
};

export type anggaran = master & {
  amount: number;
  period: string;
};

export type category = master & {
  active: boolean;
};

export type people = master & {
  debt: number;
};

export interface transaction {
  id: number;
  date: string;
  amount: number;
  note: string;
}

export type tKeluarmasuk = transaction & {
  keluarmasuk: "K" | "M";
  saku_id: number;
  saku: saku;
  category_id: number;
  category: category;
  anggaran_id: number;
  anggaran: anggaran;
};

export type tPindahsaldo = transaction & {
  saku1: saku;
  saku2: saku;
};
