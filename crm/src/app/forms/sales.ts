import {FilterField, ConstructorField, ColumnField} from "../types/Fields";

export const columns: ColumnField[] = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'datetime',
    name: 'Date',
    transform: (val: string) => new Date(val).toLocaleString()
  },
  {
    tag: 'product'
  },
  {
    tag: 'product_count',
    name: 'Count'
  },
  {
    tag: 'sum',
    name: 'Total, USD'
  },
  {
    tag: 'seller'
  },
  {
    tag: 'buyer'
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: 'number'
  },
  {
    key: 'sum',
    name: 'Total, USD',
    type: 'range'
  },
  {
    key: 'seller',
    name: 'Sellers',
    type: 'select-multiple',
    options: [],
    showID: true
  }
];
