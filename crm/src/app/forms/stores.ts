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
];

export const constructor = [
  {
    key: 'name',
    type: 'text'
  },
  {
    key: 'owner_id',
    name: 'Owner ID',
    type: 'number',
    adminOnly: true
  }
];
