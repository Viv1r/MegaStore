import {ColumnField, ConstructorField, FilterField} from "../types/Fields";

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
    type: 'number'
  },
  {
    key: 'name',
    type: 'text'
  },
  {
    key: 'owner',
    name: 'Owners',
    type: 'select-multiple',
    options: [],
    adminOnly: true
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'name',
    type: 'text'
  },
  {
    key: 'owner_id',
    name: 'Owner',
    type: 'select-one',
    options: [],
    optionsURL: 'crm/users/short',
    adminOnly: true
  }
];
