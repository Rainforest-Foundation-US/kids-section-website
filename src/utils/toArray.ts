export const toArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

export const toArrayMaybe = <T>(value: T | T[] | undefined): T[] | undefined =>
  value !== undefined ? toArray(value) : undefined;
