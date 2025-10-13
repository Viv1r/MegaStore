import {ColumnField, ConstructorField, FilterField} from "../models/fields";
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
    tag: 'owner_email',
    name: 'Owner'
  },
  {
    tag: 'products_count',
    name: 'Products'
  },
  {
    tag: 'sales'
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
  },
  {
    key: 'owner',
    name: 'Owners',
    type: FieldType.SELECT_MULTIPLE,
    options: [],
    adminOnly: true
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'name',
    type: FieldType.TEXT
  },
  {
    key: 'owner_id',
    name: 'Owner',
    type: FieldType.SELECT_ONE,
    options: [],
    optionsURL: 'crm/users/short',
    adminOnly: true
  }
];
