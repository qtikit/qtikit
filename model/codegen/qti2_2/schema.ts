import { table as primitiveTypes } from "./primitive-types.ts";

export interface Spec {
  defs: Def[];
  defByNames: { [name: string]: Def };
}

export type Def = Enum | Class;

interface DefBase<T> {
  defType: T;
  specNumber?: string;
  specHash?: string;
  name: string;
}

export interface Enum extends DefBase<"enum"> {
  items: string[];
}

export type ClassType =
  | ""
  | "list"
  | "union"
  | "selection"
  | "sequence"
  | "sequence-mixed";

export interface Class extends DefBase<"class"> {
  classType: ClassType;
  superClasses: string[];
  characteristics: { [characteristic: string]: Field };
  attributes: { [attribute: string]: Field };
}

export type Multiplicity =
  | "[1]"
  | "[0..1]"
  | "[0..unbounded]"
  | "[1..unbounded]";

export interface Field {
  name: string;
  dataType: string;
  multiplicity: Multiplicity;
}

export interface GetAncestorsResult {
  ancestors: Class[];
  primitiveAncestors: string[];
}
export function getAncestors(spec: Spec, def: Class): GetAncestorsResult {
  const visited: Set<string> = new Set();
  const result: GetAncestorsResult = {
    ancestors: [],
    primitiveAncestors: [],
  };
  let superClasses = def.superClasses.slice();
  while (superClasses.length) {
    const superClass = superClasses.pop()!;
    if (visited.has(superClass)) continue;
    else visited.add(superClass);
    if (superClass in primitiveTypes) {
      result.primitiveAncestors.push(superClass);
      continue;
    }
    const def = spec.defByNames[superClass];
    if (def.defType !== "class") continue;
    superClasses = superClasses.concat(def.superClasses);
  }
  return result;
}

export interface ExpandClassResult {
  primitiveAncestors: string[];
  characteristics: { [characteristic: string]: Field };
  attributes: { [attribute: string]: Field };
}
export function expandClass(spec: Spec, def: Class): ExpandClassResult {
  const { ancestors, primitiveAncestors } = getAncestors(spec, def);
  const result: ExpandClassResult = {
    primitiveAncestors: primitiveAncestors,
    characteristics: { ...def.characteristics },
    attributes: { ...def.attributes },
  };
  for (const ancestor of ancestors) {
    Object.assign(result.characteristics, ancestor.characteristics);
    Object.assign(result.attributes, ancestor.attributes);
  }
  return result;
}
