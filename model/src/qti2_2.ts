/**
 * # 4.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Root_AssessmentItem
 */
export interface AssessmentItemCharacteristics {
  identifier: NormalizedString;
  title: NormalizedString;
  label?: NormalizedString;
  language?: Language;
  toolName?: NormalizedString;
  toolVersion?: NormalizedString;
  adaptive: Boolean;
  timeDependent: Boolean;
}

/**
 * # 4.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Root_OutcomeDeclaration
 */
export interface OutcomeDeclaration extends OutcomeDeclarationCharacteristics {
  defaultValue?: DefaultValue;
  lookupTable?: LookupTable;
}
export interface OutcomeDeclarationCharacteristics {
  identifier: Identifier;
  cardinality: Cardinality;
  baseType?: BaseType;
  view?: View;
  interpretation?: String;
  longInterpretation?: AnyURI;
  normalMaximum?: NonNegativeDouble;
  normalMinimum?: Double;
  masteryValue?: Double;
  externalScored?: ExternalScored;
  variableIdentifierRef?: UniqueIdentifierRef;
}

/**
 * # 5.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_AreaMapping
 */
export interface AreaMapping extends AreaMappingCharacteristics {
  areaMapEntry: AreaMapEntry[];
}
export interface AreaMappingCharacteristics {
  lowerBound?: Double;
  upperBound?: Double;
  defaultValue: Double;
}

/**
 * # 5.20
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_CorrectResponse
 */
export interface CorrectResponse extends CorrectResponseCharacteristics {
  value: Value[];
}
export interface CorrectResponseCharacteristics {
  interpretation?: String;
}

/**
 * # 5.26
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_DefaultValue
 */
export interface DefaultValue extends DefaultValueCharacteristics {
  value: Value[];
}
export interface DefaultValueCharacteristics {
  interpretation?: NormalizedString;
}

/**
 * # 5.55
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_InterpolationTable
 */
export interface InterpolationTable extends InterpolationTableCharacteristics {
  interpolationTableEntry: InterpolationTableEntry[];
}
export interface InterpolationTableCharacteristics {
  defaultValue?: String;
}

/**
 * # 5.64
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_Mapping
 */
export interface Mapping extends MappingCharacteristics {
  mapEntry: MapEntry[];
}
export interface MappingCharacteristics {
  lowerBound?: Double;
  upperBound?: Double;
  defaultValue: Double;
}

/**
 * # 5.66
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_MatchTable
 */
export interface MatchTable extends MatchTableCharacteristics {
  matchTableEntry: MatchTableEntry[];
}
export interface MatchTableCharacteristics {
  defaultValue?: String;
}

/**
 * # 5.87
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Data_ResponseDeclaration
 */
export interface ResponseDeclaration
  extends ResponseDeclarationCharacteristics {
  defaultValue?: DefaultValue;
  correctResponse?: CorrectResponse;
  mapping?: Mapping;
  areaMapping?: AreaMapping;
}
export interface ResponseDeclarationCharacteristics {
  identifier: string;
  cardinality: Cardinality;
  baseType?: BaseType;
}

/**
 * # 6.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Abstract_LookupTable
 */
export interface LookupTable {
  matchTable: MatchTable;
  interpolationTable: InterpolationTable;
}

/**
 * # 7.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_AreaMapEntry
 */
export interface AreaMapEntry extends AreaMapEntryCharacteristics {}
export interface AreaMapEntryCharacteristics {
  shape: Shape;
  coords: Coords;
  mappedValue: Double;
}

/**
 * # 7.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_Coords
 */
export interface Coords {
  $: NormalizedString;
  pattern: String;
}

/**
 * # 7.12
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_Identifier
 */
export interface Identifier {
  $: NCName;
}

/**
 * # 7.13
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_InterpolationTableEntry
 */
export interface InterpolationTableEntry
  extends InterpolationTableEntryCharacteristics {
  $: Empty;
}
export interface InterpolationTableEntryCharacteristics {
  sourceValue: Double;
  includeBoundary: Boolean;
  targetValue: String;
}

/**
 * # 7.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_MapEntry
 */
export interface MapEntry extends MapEntryCharacteristics {
  $: Empty;
}
export interface MapEntryCharacteristics {
  mapKey: NormalizedString;
  mappedValue: Double;
  caseSensitive: Boolean;
}

/**
 * # 7.18
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_MatchTableEntry
 */
export interface MatchTableEntry extends MatchTableEntryCharacteristics {
  $: Empty;
}
export interface MatchTableEntryCharacteristics {
  sourceValue: Int;
  targetValue: BaseType;
}

/**
 * # 7.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#FigDerivedClass_DataModel_NonNegativeDouble
 */
export interface NonNegativeDouble {
  $: Double;
  minInclusive: Double;
}

/**
 * # 7.32
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_UniqueIdentifierRef
 */
export interface UniqueIdentifierRef {
  $: IDREF;
}

/**
 * # 7.33
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Derived_Value
 */
export interface Value extends ValueCharacteristics {
  $: NormalizedString;
}
export interface ValueCharacteristics {
  fieldIdentifier?: Identifier;
  baseType?: BaseType;
}

/**
 * 8.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Enumerated_BaseType
 */
export type BaseType =
  | "boolean"
  | "directedPair"
  | "duration"
  | "file"
  | "float"
  | "identifier"
  | "integer"
  | "pair"
  | "point"
  | "string"
  | "uri";

/**
 * # 8.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Enumerated_Cardinality
 */
export type Cardinality = "multiple" | "ordered" | "record" | "single";

/**
 * # 8.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Enumerated_ExternalScored
 */
export type ExternalScored = "externalMachine" | "human";

/**
 * # 8.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#Enumerated_Shape
 */
export type Shape =
  | "circle"
  | "default"
  | "ellipse"
  | "poly"
  | "rect";

/**
 * # 9.2.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#EnumList_View
 */
export type View =
  | "author"
  | "candidate"
  | "proctor"
  | "scorer"
  | "testConstructor"
  | "tutor";

/**
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
