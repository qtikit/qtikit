import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.17-alpha/deno-dom-wasm.ts";
import { getModelSpec, qtiModelSpecUrls } from "./spec.ts";

const qtiSpecVersion = "2.2.4";
const qtiSpecUrl = qtiModelSpecUrls[qtiSpecVersion];
const qtiSpecText = await getModelSpec(qtiSpecVersion);
const qtiSpecDoc = new DOMParser().parseFromString(qtiSpecText, "text/html")!;
const qtiSpecLinkErrors: Set<string> = new Set();

interface TableLink {
  tableNumber: string;
  hash: string;
}
const typeDefTableLinks = [...qtiSpecDoc.querySelectorAll(
  "#boxIdTable_Type > .tocCaptionLevel1",
)].map((el) => {
  const tableNumber = el.childNodes[0].textContent.replace("Table", "").trim();
  const hash = el.children[0]?.getAttribute("href")?.replace(/^#/, "") || "";
  return { tableNumber, hash } as TableLink;
});
const toc: { [firstLetter: string]: TableLink[] } = {};
for (const link of typeDefTableLinks) {
  const firstLetter = link.tableNumber[0];
  toc[firstLetter] = toc[firstLetter] || [];
  toc[firstLetter].push(link);
}

console.log(
  "// This file was automatically generated. do not edit by hand.\n",
);

console.error("Generating Root Class Descriptions...");
console.log(toc["4"].map(genClass).join("\n"));
console.error("Generating Data Class Descriptions...");
console.log(toc["5"].map(genClass).join("\n"));
console.error("Generating Abstract Class Descriptions...");
console.log(toc["6"].map(genClass).join("\n"));
console.error("Generating Derived Class Descriptions...");
console.log(toc["7"].map(genClass).join("\n"));
console.error("Generating Enumerated Vocabulary Descriptions...");
console.log(toc["8"].map(genEnum).join("\n"));
console.error("Generating Micellaneous Descriptions...");
console.log(toc["9"].map(genClass).join("\n"));
console.error("Generating Primitive Data Type Descriptions...");
console.log(getPrimitiveDataTypeCodes());
console.error({ qtiSpecLinkErrors });

function getDefinitionElements(hash: string): Element[] {
  const anchor = qtiSpecDoc.querySelector(`[name="${hash}"]`);
  if (!anchor) {
    qtiSpecLinkErrors.add(hash);
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

function getDefinitionTableFromHash(hash: string): Element | null {
  const anchor = qtiSpecDoc.querySelector(`[name="${hash}"]`);
  if (!anchor) {
    qtiSpecLinkErrors.add(hash);
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

function genDocComment(comment: string): string {
  const lines = comment.split("\n");
  return "/**\n" + lines.map((line) => ` * ${line}\n`).join("") + " */\n";
}

function genSpecDocComment({ tableNumber, hash }: TableLink): string {
  return genDocComment(`# ${tableNumber}\n${qtiSpecUrl}#${hash}`);
}

function genEnum(link: TableLink): string {
  const table = getDefinitionTableFromHash(link.hash);
  if (!table) {
    return `// Codegen Failed - ${link.tableNumber}: ${link.hash}\n`;
  }
  const { name, items } = parseDefinitionTable(table);
  const docComment = genSpecDocComment(link);
  const itemsCode = Object.keys(items).map((item) => `"${item}"`).join(" | ");
  return `${docComment}export type ${name} = ${itemsCode};`;
}

function genClass(link: TableLink): string {
  const table = getDefinitionTableFromHash(link.hash);
  if (!table) {
    return `// Codegen Failed - ${link.tableNumber}: ${link.hash}\n`;
  }
  const { name, items } = parseDefinitionTable(table);
  const codes: string[] = [];
  const classFieldCodes: string[] = [];
  const extendTypes: string[] = [];
  const classType = items["Class Type"]?.textContent || "";
  const characteristicsUl = items["Characteristics"]?.querySelector("ul");
  const attributesUl = items["Children"]?.querySelector("ul");
  if (characteristicsUl) {
    extendTypes.push(`${name}Characteristics`);
    codes.push(genCharacteristics(name, characteristicsUl));
  }
  // TODO: Derived Class, Union Class, Attribute Inheritance
  if (attributesUl && classType.includes("Selection")) {
    const fields = [...iterFields(attributesUl)].filter(
      ({ type }) => type === "ok",
    ).map((entry) => (entry as IterFieldsEntryOk).field);
    const selection = genSelectionOrChildren(fields);
    classFieldCodes.push(`  $selection: ${selection};\n`);
  } else if (attributesUl && classType.includes("Sequence")) {
    const fields = [...iterFields(attributesUl!)].filter(
      ({ type }) => type === "ok",
    ).map((entry) => (entry as IterFieldsEntryOk).field);
    if (classType.includes("Mixed")) {
      fields.unshift({
        name: "$text",
        dataType: "String",
        multiplicity: "[1]",
      });
    }
    const children = genSelectionOrChildren(fields);
    classFieldCodes.push(`  $children: ${children}[];\n`);
  } else {
    if (attributesUl) {
      extendTypes.push(`${name}Attributes`);
      codes.push(genAttributes(name, attributesUl));
    }
  }
  const extendsCode = extendTypes.length
    ? ` extends ${extendTypes.join(", ")}`
    : "";
  const classBody = classFieldCodes.length
    ? `{\n${classFieldCodes.join("")}}`
    : "{}";
  codes.unshift(
    genSpecDocComment(link),
    `export interface ${name}${extendsCode} ${classBody}\n`,
  );
  return codes.join("");
}

function genCharacteristics(name: string, ul: Element): string {
  return `export interface ${name}Characteristics {\n${genFields(ul)}}\n`;
}

function genAttributes(name: string, ul: Element): string {
  return `export interface ${name}Attributes {\n${genFields(ul)}}\n`;
}

function genSelectionOrChildren(fields: Field[]): string {
  return fields.map(
    (field) => `["${field.name}", ${field.dataType}]`,
  ).join(" | ");
}

function genFields(ul: Element): string {
  const result = [];
  for (const entry of iterFields(ul)) {
    switch (entry.type) {
      case "ok":
        result.push(genField(entry.field));
        break;
      case "fail":
        result.push(`  // Codegen Failed - ${entry.hash}\n`);
        break;
    }
  }
  return result.join("");
}

function genField({ name, dataType, multiplicity }: Field): string {
  const _name = name.includes("-") ? `"${name}"` : name;
  if (multiplicity === "[1]") return `  ${_name}: ${dataType};\n`;
  if (multiplicity === "[0..1]") return `  ${_name}?: ${dataType};\n`;
  return `  ${_name}: ${dataType}[];\n`;
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
function* iterFields(ul: Element): Generator<IterFieldsEntry> {
  for (const li of ul.querySelectorAll("li")) {
    const hash = li.children[0].getAttribute("href")!.replace(/^#/, "");
    const field = getField(hash);
    if (field) {
      yield { type: "ok", field };
    } else {
      qtiSpecLinkErrors.add(hash);
      yield { type: "fail", hash };
    }
  }
}

interface Field {
  name: string;
  dataType: string;
  multiplicity: string;
}
function getField(hash: string): Field | null {
  const els = getDefinitionElements(hash);
  const table = getDefinitionTableFromElements(els);
  if (!table) return null;
  const { name, items } = parseDefinitionTable(table);
  const dataType = items["Data Type"].textContent.split(" ")[0];
  const multiplicity = items["Multiplicity"].textContent.trim();
  return { name, dataType, multiplicity };
}

function getPrimitiveDataTypeCodes(): string {
  return `/**
* # A1.3
* The namespace data-type i.e. defining data from any context (this is used for allowing any form of extension and the form of that extension is dependent on the type of binding);
*/
export type AnyTypeLax = string;

/**
* # A1.3
* The AnyURI data-type (absolute or relative URI);
*/
export type AnyURI = string;

/**
* # A1.3
* The base data-type for defining a base URI/URL link reference;
*/
export type Base = string;

/**
* # A1.3
* The boolean data-type (with permitted values of "true" and "false");
*/
export type Boolean = boolean;

/**
* # A1.3
* The date data-type (using the [ISO 8601] format);
*/
export type Date = string;

/**
* # A1.3
* The date/time data-type (using the [ISO 8601] format);
*/
export type DateTime = string;

/**
* # A1.3
* The decimal data-type (a variable precision number that is either positive or negative);
*/
export type Decimal = string;

/**
* # A1.3
* The double data-type (double precision floating point number - 64bit);
*/
export type Double = number;

/**
* # A1.3
* The duration data-type (using the [ISO 8601] format)
*/
export type Duration = string;

/**
* # A1.3
* The associated instance must be empty i.e. no child attributes;
*/
export type Empty = undefined;

/**
* # A1.3
* The float data-type (single precision floating point number - 32bit);
*/
export type Float = number;

/**
* # A1.3
* The unique identifier data-type (the scope is constrained to the instance file);
*/
export type ID = string;

/**
* # A1.3
* The reference to a previously defined unique identifier data-type (ID);
*/
export type IDREF = string;

/**
* # A1.3
* T list, whitespace separated, of references to a previously defined unique identifier data-type (ID);
*/
export type IDREFS = string;

/**
* # A1.3
* The int data-type with a numeric value from -2147483648 to 2147483647;
*/
export type Int = number;

/**
* # A1.3
* The integer data-type (this is derived from the "decimal" data-type i.e. no decimal places);
*/
export type Integer = string;

/**
* # A1.3
* The language data-type as defined in [RFC 5646];
*/
export type Language = string;

/**
* # A1.3
* The Name data-type as per the XML 1.0 definition);
*/
export type Name = string;

/**
* # A1.3
* The namespace data-type i.e. defining data from a context other than that as the default for the data model (this is used for importing other data models);
*/
export type Namespace = string;

/**
* # A1.3
* The namespace data-type i.e. defining data from a context other than that as the default for the data model (this is used for importing other data models but being lax on the validation);
*/
export type NamespaceLax = string;

/**
* # A1.3
* The non-negative integer data-type (this is derived from the "integer" data-type) i.e. an integer that is zero or higher;
*/
export type NonNegativeInteger = string;

/**
* # A1.3
* The NCName data-type (derived from the Name data-type i.e. non-colonized name);
*/
export type NCName = string;

/**
* # A1.3
* The normalized string data type (strings with line feeds, carriage returns and tab characters removed);
*/
export type NormalizedString = string;

/**
* # A1.3
* The positive integer data-type (this is derived from the "nonNegativeinteger" data-type) i.e. an integer that is one or higher;
*/
export type PositiveInteger = string;

/**
* # A1.3
* The normalized string data type;
*/
export type String = string;

/**
* # A1.3
* The time data-type (using the [ISO 8601] format).
*/
export type Time = string;
`;
}
