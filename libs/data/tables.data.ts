import { KeyValue } from '@pizza/interfaces';

const tables: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const PIZZA_TABLES: KeyValue[] = tables.map((table) => ({
  key: `${table}`,
  value: table,
}));
