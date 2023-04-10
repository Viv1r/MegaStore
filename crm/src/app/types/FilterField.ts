export interface FilterField {
  key: string;
  name?: string;
  type: 'text' | 'longtext' | 'number' | 'select-one' | 'select-multiple' | 'range' | 'dictionary';
  options?: { id: number, name: string }[];
  adminOnly?: boolean;
}
