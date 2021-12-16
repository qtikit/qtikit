export function parseBoolean(value: any): boolean {
  return !value ? false : (JSON.parse(value) as boolean);
}
