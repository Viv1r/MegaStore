import {FilterField, ConstructorField, ColumnField} from "../models/fields";
import {FieldType} from "../models/field-type";

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
    type: FieldType.NUMBER
  },
  {
    key: 'name',
    type: FieldType.TEXT
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'name',
    type: FieldType.TEXT
  }
];
