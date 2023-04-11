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
  type: 'text' | 'longtext' | 'number' | 'select-one' | 'select-multiple' | 'range' | 'dictionary';
  options?: Option[];
  showID?: boolean;
  adminOnly?: boolean;
}

export interface ConstructorField {
  key: string;
  name?: string;
  type: 'text' | 'longtext' | 'number' | 'select-one' | 'select-multiple' | 'range' | 'dictionary' | 'image';
  options?: Option[];
  showID?: boolean;
  adminOnly?: boolean;
  optionsURL?: string;
  optional?: boolean;
}
