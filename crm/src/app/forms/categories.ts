import { FilterField } from "../types/FilterField";

export const columns = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'name',
    name: 'Name',
    default: 'Anonymous'
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

export const constructor = [
  {
    key: 'name',
    type: 'text'
  }
];
