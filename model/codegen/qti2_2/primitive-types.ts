export const table = {
  "AnyTypeLax": "string",
  "AnyURI": "string",
  "Base": "string",
  "Boolean": "boolean",
  "Date": "string",
  "DateTime": "string",
  "Decimal": "string",
  "Double": "number",
  "Duration": "string",
  "Empty": "undefined",
  "Float": "number",
  "ID": "string",
  "IDREF": "string",
  "IDREFS": "string",
  "Int": "number",
  "Integer": "string",
  "Language": "string",
  "Name": "string",
  "Namespace": "string",
  "NamespaceLax": "string",
  "NonNegativeInteger": "string",
  "NCName": "string",
  "NormalizedString": "string",
  "PositiveInteger": "string",
  "String": "string",
  "Time": "string",
} as const;

export function getPrimitiveDataTypeCodes(): string {
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
export type Time = string;`;
}
