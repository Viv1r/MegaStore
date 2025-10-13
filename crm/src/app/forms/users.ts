import {ColumnField, FilterField, ConstructorField} from "../models/fields";
import {FieldType} from "../models/field-type";

export const columns: ColumnField[] = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'email',
    name: 'E-mail'
  },
  {
    tag: 'password'
  },
  {
    tag: 'name'
  },
  {
    tag: 'stores_count',
    name: 'Owned stores',
    default: 0
  },
  {
    tag: 'is_admin',
    name: 'Is admin',
    default: false
  },
  {
    tag: 'is_banned',
    name: 'Is banned',
    highlightValue: true
  },
  {
    tag: 'last_login',
    name: 'Last log in',
    transform: (val: string) => new Date(val).toLocaleString()
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: FieldType.NUMBER
  },
  {
    key: 'email',
    name: 'E-mail',
    type: FieldType.TEXT
  },
  {
    key: 'name',
    type: FieldType.TEXT
  },
  {
    key: 'is_admin',
    name: 'Access level',
    type: FieldType.SELECT_ONE,
    options: [
      {
        id: 1,
        name: 'Admin'
      },
      {
        id: 0,
        name: 'Not admin'
      }
    ]
  },
  {
    key: 'is_banned',
    name: 'Status',
    type: FieldType.SELECT_ONE,
    options: [
      {
        id: false,
        name: 'Not banned'
      },
      {
        id: true,
        name: 'Banned'
      }
    ]
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'email',
    type: FieldType.TEXT
  },
  {
    key: 'password',
    type: FieldType.TEXT
  },
  {
    key: 'name',
    type: FieldType.TEXT
  },
  {
    key: 'is_admin',
    name: 'Access level',
    type: FieldType.SELECT_ONE,
    rootOnly: true,
    options: [
      {
        id: false,
        name: 'Not admin'
      },
      {
        id: true,
        name: 'Admin'
      }
    ]
  },
  {
    key: 'is_banned',
    name: 'Status',
    type: FieldType.SELECT_ONE,
    options: [
      {
        id: false,
        name: 'Not banned'
      },
      {
        id: true,
        name: 'Banned'
      }
    ]
  }
];
