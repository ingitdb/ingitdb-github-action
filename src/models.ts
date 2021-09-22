export interface Collection {
  dir: string;
  recordMode: "directory" | "json";
  primaryKey: string[];
  fields: Field[];
  title: TitleItem[];
}

export interface TitleItem {
  field?: string;
  str?: string;
  func?: "UPPERCASE";
}

export interface Field {
  name: string;
  type: "string" | "number" | "url" | "boolean";
  min?: number;
  max?: number;
}
