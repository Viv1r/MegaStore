import {FilterField, ConstructorField, ColumnField} from "../types/Fields";

export const columns: ColumnField[] = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'name'
  },
  {
    tag: 'products_count',
    name: 'Products in category',
    default: 0
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: 'number'
  },
  {
    key: 'name',
    type: 'text'
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'name',
    type: 'text'
  }
];
