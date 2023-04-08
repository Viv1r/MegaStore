import { FilterField } from "../types/FilterField";

export const columns = [
  {
    tag: 'id',
    name: 'ID'
  },
  {
    tag: 'category',
    name: 'Category'
  },
  {
    tag: 'title',
    name: 'Title'
  },
  {
    tag: 'description',
    name: 'Description'
  },
  {
    tag: 'price',
    name: 'Price'
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
    tag: 'store',
    name: 'Seller'
  }
];

export const filters: FilterField[] = [
  {
    key: 'id',
    name: 'ID',
    type: 'number'
  },
  {
    key: 'category',
    name: 'Categories',
    type: 'select-multiple',
    options: []
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
    options: []
  }
];

export const constructor = [
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
    optionsURL: 'crm/stores/short'
  }
];
