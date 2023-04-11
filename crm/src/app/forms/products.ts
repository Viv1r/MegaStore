import {FilterField, ConstructorField, ColumnField} from "../types/Fields";

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
    type: 'number'
  },
  {
    key: 'title',
    type: 'text'
  },
  {
    key: 'description',
    type: 'text'
  },
  {
    key: 'category',
    name: 'Categories',
    type: 'select-multiple',
    options: []
  },
  {
    key: 'price',
    type: 'range'
  },
  {
    key: 'count_available',
    name: 'In Stock',
    type: 'range'
  },
  {
    key: 'store',
    name: 'Sellers',
    type: 'select-multiple',
    options: [],
    showID: true
  }
];

export const constructor: ConstructorField[] = [
  {
    key: 'category_id',
    name: 'Category',
    type: 'select-one',
    options: [],
    optionsURL: 'categories'
  },
  {
    key: 'title',
    type: 'text'
  },
  {
    key: 'description',
    type: 'longtext'
  },
  {
    key: 'price',
    type: 'number'
  },
  {
    key: 'price_postfix',
    name: 'Unit',
    type: 'text',
    optional: true
  },
  {
    key: 'attributes',
    type: 'dictionary',
    optional: true
  },
  {
    key: 'count_available',
    name: 'In Stock',
    type: 'number',
    optional: true
  },
  {
    key: 'store_id',
    name: 'Seller store',
    type: 'select-one',
    options: [],
    optionsURL: 'crm/stores/short',
    showID: true
  }
];
