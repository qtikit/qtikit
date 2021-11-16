import cacheAsFile from "../misc/cacheAsFile.ts";
import { getModelSpec, qtiModelSpecUrls } from "../spec.ts";
import { Class, Enum, expandClass, Field, Spec } from "./schema.ts";
import { getPrimitiveDataTypeCodes } from "./primitive-types.ts";
import build, { parseHtml } from "./build.ts";

const qtiSpecVersion = "2.2.4";
const qtiModelSpecUrl = qtiModelSpecUrls[qtiSpecVersion];

if (import.meta.main) {
  const spec = await cacheAsFile<Spec>(
    `spec/${qtiSpecVersion}.json`,
    async () => {
      const qtiModelSpecText = await getModelSpec(qtiSpecVersion);
      const qtiModelSpecDoc = parseHtml(qtiModelSpecText);
      return build(qtiModelSpecDoc, console.error);
    },
    (v) => JSON.stringify(v, null, 2),
    JSON.parse,
  );
  const code = gen(spec);
  console.log(code);
}

export default function gen(spec: Spec): string {
  const codes: string[] = [
    "// This file was automatically generated. do not edit by hand.\n\n",
  ];
  for (const def of spec.defs) {
    codes.push(genSpecDocComment(def.specNumber, def.specHash));
    switch (def.defType) {
      case "enum":
        codes.push(genEnum(def), "\n");
        break;
      case "class":
        codes.push(genClass(spec, def), "\n");
        break;
    }
  }
  codes.push(getPrimitiveDataTypeCodes());
  return codes.join("");
}

function genEnum(def: Enum): string {
  const itemsCode = def.items.map((item) => `"${item}"`).join(" | ");
  return `export type ${def.name} = ${itemsCode};\n`;
}

function genClass(spec: Spec, def: Class): string {
  const codes: string[] = [];
  const classFieldCodes: string[] = [];
  const extendTypes: string[] = [];
  const { name, classType } = def;
  if (classType === "union") {
    return `export type ${name} = ${def.superClasses.join(" | ")};\n`;
  }
  if (classType === "list") {
    return `export type ${name} = (${def.superClasses.join(" | ")})[];\n`;
  }
  const { primitiveAncestors, characteristics, attributes } = expandClass(
    spec,
    def,
  );
  if (primitiveAncestors.length) {
    classFieldCodes.push(`  $value: ${primitiveAncestors.join(" | ")};\n`);
  }
  const charFields = Object.values(characteristics);
  const attrFields = Object.values(attributes);
  if (charFields.length) {
    extendTypes.push(`${name}Characteristics`);
    codes.push(genCharacteristics(name, charFields));
  }
  if (classType === "selection") {
    const selection = genSelectionOrChildren(Object.values(attributes));
    classFieldCodes.push(`  $selection: ${selection};\n`);
  } else if (classType === "sequence" || classType === "sequence-mixed") {
    if (classType === "sequence-mixed") {
      attrFields.unshift({
        name: "$text",
        dataType: "String",
        multiplicity: "[1]",
      });
    }
    if (attrFields.length) {
      const children = genSelectionOrChildren(attrFields);
      classFieldCodes.push(`  $children: (${children})[];\n`);
    }
  } else {
    if (attrFields.length) {
      extendTypes.push(`${name}Attributes`);
      codes.push(genAttributes(name, attrFields));
    }
  }
  const extendsCode = extendTypes.length
    ? ` extends ${extendTypes.join(", ")}`
    : "";
  const classBody = classFieldCodes.length
    ? `{\n${classFieldCodes.join("")}}`
    : "{}";
  codes.unshift(`export interface ${name}${extendsCode} ${classBody}\n`);
  return codes.join("");
}

function genCharacteristics(name: string, fields: Field[]): string {
  return `export interface ${name}Characteristics {\n${genFields(fields)}}\n`;
}

function genAttributes(name: string, fields: Field[]): string {
  return `export interface ${name}Attributes {\n${genFields(fields)}}\n`;
}

function genSelectionOrChildren(fields: Field[]): string {
  return fields.map((field) => `["${field.name}", ${field.dataType}]`).join(
    " | ",
  );
}

function genFields(fields: Field[]): string {
  return fields.map(genField).join("");
}

function genField({ name, dataType, multiplicity }: Field): string {
  const _name = name.includes("-") ? `"${name}"` : name;
  if (multiplicity === "[1]") return `  ${_name}: ${dataType};\n`;
  if (multiplicity === "[0..1]") return `  ${_name}?: ${dataType};\n`;
  return `  ${_name}: ${dataType}[];\n`;
}

function genSpecDocComment(specNumber?: string, hash?: string): string {
  const lines: string[] = [];
  if (specNumber) lines.push(`# ${specNumber}`);
  if (hash) lines.push(`${qtiModelSpecUrl}#${hash}`);
  return genDocComment(lines.join("\n"));
}

function genDocComment(comment: string): string {
  const lines = comment.split("\n");
  return "/**\n" + lines.map((line) => ` * ${line}\n`).join("") + " */\n";
}
