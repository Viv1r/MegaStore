import { FilterField } from "../types/FilterField";

export const columns = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'email',
    name: 'E-mail'
  },
  {
    tag: 'password',
    name: 'Password'
  },
  {
    tag: 'name',
    name: 'Name',
    default: 'Anonymous'
  },
  {
    tag: 'stores_count',
    name: 'Owned stores',
    default: 0
  },
  {
    tag: 'is_banned',
    name: 'Is banned'
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: 'number'
  },
  {
    key: 'email',
    name: 'E-mail',
    type: 'text'
  },
  {
    key: 'name',
    type: 'text'
  },
  {
    key: 'is_banned',
    name: 'Status',
    type: 'select-one',
    options: [
      {
        id: 1,
        name: 'Banned'
      },
      {
        id: 0,
        name: 'Not banned'
      }
    ]
  }
];
