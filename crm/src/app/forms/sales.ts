import {FilterField, ConstructorField, ColumnField} from "../models/fields";
import {FieldType} from "../models/field-type";

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
    type: FieldType.NUMBER
  },
  {
    key: 'sum',
    name: 'Total, USD',
    type: FieldType.RANGE
  },
  {
    key: 'seller',
    name: 'Sellers',
    type: FieldType.SELECT_MULTIPLE,
    options: [],
    showID: true
  }
];
