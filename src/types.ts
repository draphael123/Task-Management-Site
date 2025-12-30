export type FieldType = 'text' | 'status' | 'number' | 'date';

export interface StatusOption {
  id: string;
  label: string;
  color: string;
}

export interface Column {
  id: string;
  name: string;
  type: FieldType;
  statusOptions?: StatusOption[];
}

export interface Cell {
  columnId: string;
  value: string | number | null;
}

export interface Row {
  id: string;
  cells: Cell[];
}

export interface Database {
  columns: Column[];
  rows: Row[];
}

