import {FieldType} from "./field-type";

interface Option {
  id: number | boolean;
  name: string;
}

export interface ColumnField {
  tag: string;
  name?: string;
  highlightValue?: any;
  default?: any;
  transform?: Function;
  image?: boolean;
}

export interface FilterField {
  key: string;
  name?: string;
  type: FieldType;
  options?: Option[];
  showID?: boolean;
  adminOnly?: boolean;
}

export interface ConstructorField {
  key: string;
  name?: string;
  type: FieldType;
  options?: Option[];
  showID?: boolean;
  adminOnly?: boolean;
  rootOnly?: boolean;
  optionsURL?: string;
  optional?: boolean;
}
