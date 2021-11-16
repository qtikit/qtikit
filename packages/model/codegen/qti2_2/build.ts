import {
  Document,
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.17-alpha/deno-dom-wasm.ts";

import { Class, Enum, Field, Spec } from "./schema.ts";

export function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html")!;
}

export default function build(
  qtiSpecDoc: Document,
  log?: (message: string) => void,
): Spec {
  const errors: Set<string> = new Set();
  const spec: Spec = { defs: [], defByNames: {} };
  const toc = getToc(qtiSpecDoc);
  buildDefs("4", "Root Class Descriptions", getClass);
  buildDefs("5", "Data Class Descriptions", getClass);
  buildDefs("6", "Abstract Class Descriptions", getClass);
  buildDefs("7", "Derived Class Descriptions", getClass);
  buildDefs("8", "Enumerated Vocabulary Descriptions", getEnum);
  buildDefs("9", "Micellaneous Descriptions", getClass);
  function buildDefs(tocKey: string, tocType: string, getDefFn: GetDefFn<any>) {
    log?.(`Building ${tocType}...`);
    for (const link of toc[tocKey]) {
      const def = getDefFn(qtiSpecDoc, link, errors);
      if (def) {
        spec.defs.push(def);
        spec.defByNames[def.name] = def;
      }
    }
  }
  return spec;
}

interface TableLink {
  tableNumber: string;
  hash: string;
}
interface Toc {
  [firstLetter: string]: TableLink[];
}
function getToc(qtiSpecDoc: Document): Toc {
  const typeDefTableLinks = [
    ...qtiSpecDoc.querySelectorAll("#boxIdTable_Type > .tocCaptionLevel1"),
  ].map((el) => {
    const caption = el.childNodes[0];
    const tableNumber = caption.textContent.replace("Table", "").trim();
    const hash = el.children[0]?.getAttribute("href")?.replace(/^#/, "") || "";
    return { tableNumber, hash } as TableLink;
  });
  const toc: { [firstLetter: string]: TableLink[] } = {};
  for (const link of typeDefTableLinks) {
    const firstLetter = link.tableNumber[0];
    toc[firstLetter] = toc[firstLetter] || [];
    toc[firstLetter].push(link);
  }
  return toc;
}

interface GetDefFn<T> {
  (doc: Document, link: TableLink, errors: Set<string>): T | null;
}

function getEnum(
  doc: Document,
  link: TableLink,
  errors: Set<string>,
): Enum | null {
  const table = getDefinitionTableFromHash(doc, link.hash, errors);
  if (!table) return null;
  const { name, items } = parseDefinitionTable(table);
  return {
    defType: "enum",
    specNumber: link.tableNumber,
    specHash: link.hash,
    name,
    items: Object.keys(items),
  };
}

function getClass(
  doc: Document,
  link: TableLink,
  errors: Set<string>,
): Class | null {
  const table = getDefinitionTableFromHash(doc, link.hash, errors);
  if (!table) return null;
  const { name, items } = parseDefinitionTable(table);
  const _classType = items["Class Type"]?.textContent || "";
  const superClassesUl = items["Super Classes"]?.querySelector("ul");
  const characteristicsUl = items["Characteristics"]?.querySelector("ul");
  const attributesUl = items["Children"]?.querySelector("ul");
  const superClasses = getSuperClasses(superClassesUl);
  const characteristics = characteristicsUl
    ? getFields(doc, characteristicsUl, errors)
    : {};
  const attributes = attributesUl ? getFields(doc, attributesUl, errors) : {};
  let classType: Class["classType"] = "";
  if (_classType.includes("List")) {
    classType = "list";
  } else if (_classType.includes("Union")) {
    classType = "union";
  } else if (_classType.includes("Selection")) {
    classType = "selection";
  } else if (_classType.includes("Sequence")) {
    if (_classType.includes("Mixed")) {
      classType = "sequence-mixed";
    } else {
      classType = "sequence";
    }
  }
  return {
    defType: "class",
    specNumber: link.tableNumber,
    specHash: link.hash,
    name,
    classType,
    superClasses,
    characteristics,
    attributes,
  };
}

function getSuperClasses(ul: Element | null): string[] {
  if (!ul) return [];
  return [...ul.querySelectorAll("li")].map((li) =>
    li.textContent.split(" ")[0]
  );
}

function getFields(doc: Document, ul: Element, errors: Set<string>): Field[] {
  return [...iterFields(doc, ul, errors)]
    .filter(({ type }) => type === "ok")
    .map((entry) => (entry as IterFieldsEntryOk).field);
}

type IterFieldsEntry = IterFieldsEntryOk | IterFieldsEntryFail;
interface IterFieldsEntryOk {
  type: "ok";
  field: Field;
}
interface IterFieldsEntryFail {
  type: "fail";
  hash: string;
}
function* iterFields(
  doc: Document,
  ul: Element,
  errors: Set<string>,
): Generator<IterFieldsEntry> {
  for (const li of ul.querySelectorAll("li")) {
    const hash = li.children[0].getAttribute("href")!.replace(/^#/, "");
    const field = getField(doc, hash, errors);
    if (field) {
      yield { type: "ok", field };
    } else {
      errors.add(hash);
      yield { type: "fail", hash };
    }
  }
}

function getField(
  doc: Document,
  hash: string,
  errors: Set<string>,
): Field | null {
  const els = getDefinitionElements(doc, hash, errors);
  const table = getDefinitionTableFromElements(els);
  if (!table) return null;
  const { name, items } = parseDefinitionTable(table);
  const dataType = items["Data Type"].textContent.split(" ")[0];
  const _multiplicity = items["Multiplicity"].textContent.replaceAll(/\s/g, "");
  const multiplicity = _multiplicity as Field["multiplicity"];
  return { name, dataType, multiplicity };
}

function getDefinitionElements(
  doc: Document,
  hash: string,
  errors: Set<string>,
): Element[] {
  const anchor = doc.querySelector(`[name="${hash}"]`);
  if (!anchor) {
    errors.add(hash);
    return [];
  }
  const heading = anchor.parentElement!;
  const result = [];
  let curr = heading.nextElementSibling;
  while (curr && !curr.tagName.startsWith("H")) {
    result.push(curr);
    curr = curr.nextElementSibling;
  }
  return result;
}

function getDefinitionTableFromHash(
  doc: Document,
  hash: string,
  errors: Set<string>,
): Element | null {
  const anchor = doc.querySelector(`[name="${hash}"]`);
  if (!anchor) {
    errors.add(hash);
    return null;
  }
  return anchor.parentElement?.parentElement ?? null;
}

function getDefinitionTableFromElements(els: Element[]): Element | null {
  return els.reduce<Element | null>(
    (prev, curr) => prev ?? curr.querySelector("table"),
    null,
  );
}

interface DefinitionTable {
  name: string;
  items: { [key: string]: Element };
}
function parseDefinitionTable(table: Element): DefinitionTable {
  const name = /"(.+?)"/.exec(table.querySelector("caption")!.textContent)![1];
  const rows = [...table.querySelectorAll("tr")].slice(1) as Element[];
  const items: { [key: string]: Element } = {};
  for (const row of rows) {
    const [th, td] = [...row.querySelectorAll("td")];
    const key = th.textContent.trim();
    items[key] = td as Element;
  }
  return { name, items };
}
