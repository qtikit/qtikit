export function parseBoolean(value: any): boolean {
  return !value ? false : (JSON.parse(value) as boolean);
}

export function parseMaxChoices(maxChoices: string | undefined): number {
  return Number.parseInt(maxChoices ?? '0');
}
