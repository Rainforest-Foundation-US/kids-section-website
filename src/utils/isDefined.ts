// Type predicate function to filter out undefined or null values
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
