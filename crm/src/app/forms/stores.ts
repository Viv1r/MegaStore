import { FilterField } from "../types/FilterField";

export const columns = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'name',
    name: 'Name'
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
    tag: 'sales',
    name: 'Sales'
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
    name: 'Name',
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

export const constructor = [
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
