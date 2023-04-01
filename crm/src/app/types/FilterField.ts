export interface FilterField {
  key: string;
  name?: string;
  type: 'text' | 'number' | 'select-one' | 'select-multiple' | 'range';
  options?: { id: number, name: string }[];
}
