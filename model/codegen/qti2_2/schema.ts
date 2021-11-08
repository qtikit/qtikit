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

export interface Enum extends DefBase<'enum'> {
  items: string[];
}

export interface Class extends DefBase<'class'> {
  classType: "" | "union" | "selection" | "sequence" | "sequence-mixed";
  superClasses: string[];
  characteristics: { [characteristic: string]: Field };
  attributes: { [attribute: string]: Field };
}

export interface Field {
  name: string;
  dataType: string;
  multiplicity: "[1]" | "[0..1]" | "[0..unbounded]" | "[1..unbounded]";
}
