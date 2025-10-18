import {FilterField, ConstructorField, ColumnField} from "../models/fields";
import {FieldType} from "../models/field-type";

export const columns: ColumnField[] = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'title'
  },
  {
    tag: 'description'
  },
  {
    tag: 'price'
  },
  {
    tag: 'price_postfix',
    name: 'Unit',
    default: 'per pc.'
  },
  {
    tag: 'count_available',
    name: 'In stock',
    highlightValue: 0
  },
  {
    tag: 'category'
  },
  {
    tag: 'store',
    name: 'Seller'
  },
  {
    tag: 'picture',
    image: true
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: FieldType.NUMBER
  },
  {
    key: 'title',
    type: FieldType.TEXT
  },
  {
    key: 'description',
    type: FieldType.TEXT
  },
  {
    key: 'category',
    name: 'Categories',
    type: FieldType.SELECT_MULTIPLE,
    options: []
  },
  {
    key: 'price',
    type: FieldType.RANGE
  },
  {
    key: 'count_available',
    name: 'In Stock',
    type: FieldType.RANGE
  },
  {
    key: 'store',
    name: 'Sellers',
    type: FieldType.SELECT_MULTIPLE,
    options: [],
    showID: true
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'category_id',
    name: 'Category',
    type: FieldType.SELECT_ONE,
    options: [],
    optionsURL: 'categories'
  },
  {
    key: 'title',
    type: FieldType.TEXT
  },
  {
    key: 'description',
    type: FieldType.LONG_TEXT
  },
  {
    key: 'price',
    type: FieldType.NUMBER
  },
  {
    key: 'price_postfix',
    name: 'Unit (e. g. kg)',
    type: FieldType.TEXT,
    optional: true
  },
  {
    key: 'attributes',
    type: FieldType.DICTIONARY,
    optional: true
  },
  {
    key: 'count_available',
    name: 'In stock',
    type: FieldType.NUMBER,
    optional: true
  },
  {
    key: 'store_id',
    name: 'Seller store',
    type: FieldType.SELECT_ONE,
    options: [],
    optionsURL: 'crm/stores/short',
    showID: true
  }
];
