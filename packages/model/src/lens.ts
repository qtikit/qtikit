export const defaultCase = Symbol.for('default');

export type MatchTable<T extends [string, any]> = {
  [key in T[0]]?: (selection: Extract<T, [key, any]>[1]) => any;
} & {
  [defaultCase]?: (selection: T[1]) => any;
};

export type ReturnTypeOfMatchTable<T extends MatchTable<any>> = ReturnType<
  T[keyof T] extends (...args: any[]) => any ? T[keyof T] : () => any
>;

export function matchSelection<
  T extends [string, any],
  U extends MatchTable<T>
>(selection: T, matchTable: U): ReturnTypeOfMatchTable<U> {
  if (selection[0] in matchTable) return matchTable[selection[0] as T[0]]!(selection[1]);
  return matchTable[defaultCase]?.(selection[1]);
}

export function findChildByType<
  T extends [string, any][],
  U extends T[number],
  V extends string
>(children: T, type: V): Extract<U, [V, any]>[1] | undefined {
  return children.find(child => child[0] === type)?.[1];
}

export function filterChildrenByType<
  T extends [string, any][],
  U extends T[number],
  V extends string
>(children: T, type: V): Extract<U, [V, any]>[1][] {
  return children.filter(child => child[0] === type).map(child => child[1]);
}
