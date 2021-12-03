// This file was automatically generated. do not edit by hand.

/**
 * # 4.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_AssessmentItem
 */
export interface AssessmentItem extends AssessmentItemCharacteristics {
  $children: (
    | ['responseDeclaration', ResponseDeclaration]
    | ['outcomeDeclaration', OutcomeDeclaration]
    | ['templateDeclaration', TemplateDeclaration]
    | ['templateProcessing', TemplateProcessing]
    | ['assessmentStimulusRef', AssessmentStimulusRef]
    | ['stylesheet', StyleSheet]
    | ['itemBody', ItemBody]
    | ['responseProcessing', ResponseProcessing]
    | ['modalFeedback', ModalFeedback]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface AssessmentItemCharacteristics {
  identifier: NormalizedString;
  title: NormalizedString;
  label?: NormalizedString;
  language?: Language;
  toolName?: NormalizedString;
  toolVersion?: NormalizedString;
  adaptive?: boolean;
  timeDependent: boolean;
}

/**
 * # 4.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_AssessmentSection
 */
export interface AssessmentSection extends AssessmentSectionCharacteristics {
  $children: (
    | ['preCondition', LogicSingle]
    | ['branchRule', BranchRule]
    | ['itemSessionControl', ItemSessionControl]
    | ['timeLimits', TimeLimits]
    | ['selection', Selection]
    | ['ordering', Ordering]
    | ['rubricBlock', RubricBlock]
    | ['sectionPart', SectionPart]
  )[];
}
export interface AssessmentSectionCharacteristics {
  identifier: NormalizedString;
  required?: boolean;
  fixed?: boolean;
  title: NormalizedString;
  visible: boolean;
  keepTogether?: boolean;
}

/**
 * # 4.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_AssessmentStimulus
 */
export interface AssessmentStimulus extends AssessmentStimulusCharacteristics {
  $children: (['stylesheet', StyleSheet] | ['stimulusBody', StimulusBody] | ['apipAccessibility', APIPAccessibility])[];
}
export interface AssessmentStimulusCharacteristics {
  identifier: NormalizedString;
  title: NormalizedString;
  label?: NormalizedString;
  language?: Language;
  toolName?: NormalizedString;
  toolVersion?: NormalizedString;
}

/**
 * # 4.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_AssessmentTest
 */
export interface AssessmentTest extends AssessmentTestCharacteristics {
  $children: (
    | ['outcomeDeclaration', OutcomeDeclaration]
    | ['timeLimits', TimeLimits]
    | ['stylesheet', StyleSheet]
    | ['testPart', TestPart]
    | ['outcomeProcessing', OutcomeProcessing]
    | ['testFeedback', TestFeedback]
  )[];
}
export interface AssessmentTestCharacteristics {
  identifier: NormalizedString;
  title: NormalizedString;
  toolName?: NormalizedString;
  toolVersion?: NormalizedString;
}

/**
 * # 4.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_OutcomeDeclaration
 */
export interface OutcomeDeclaration extends OutcomeDeclarationCharacteristics {
  $children: (['defaultValue', DefaultValue] | ['lookupTable', LookupTable])[];
}
export interface OutcomeDeclarationCharacteristics {
  identifier: Identifier;
  cardinality: Cardinality;
  baseType?: BaseType;
  view?: View;
  interpretation?: string;
  longInterpretation?: AnyURI;
  normalMaximum?: NonNegativeDouble;
  normalMinimum?: Double;
  masteryValue?: Double;
  externalScored?: ExternalScored;
  variableIdentifierRef?: UniqueIdentifierRef;
}

/**
 * # 4.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabRootClass_DataModel_ResponseProcessing
 */
export interface ResponseProcessing extends ResponseProcessingCharacteristics {
  $children: ['responseRuleGroup', ResponseRuleGroup][];
}
export interface ResponseProcessingCharacteristics {
  template?: AnyURI;
  templateLocation?: AnyURI;
}

/**
 * # 5.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_A
 */
export interface A extends ACharacteristics {
  $children: (['$text', string] | ['inlineGroup', InlineGroup])[];
}
export interface ACharacteristics {
  href: AnyURI;
  type?: MimeType;
}

/**
 * # 5.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_AnyN
 */
export interface AnyN extends AnyNCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface AnyNCharacteristics {
  min: IntegerOrVariableRef;
  max: IntegerOrVariableRef;
}

/**
 * # 5.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_AreaMapping
 */
export interface AreaMapping extends AreaMappingCharacteristics {
  $children: ['areaMapEntry', AreaMapEntry][];
}
export interface AreaMappingCharacteristics {
  lowerBound?: Double;
  upperBound?: Double;
  defaultValue?: Double;
}

/**
 * # 5.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_AssessmentItemRef
 */
export interface AssessmentItemRef extends AssessmentItemRefCharacteristics {
  $children: (
    | ['preCondition', LogicSingle]
    | ['branchRule', BranchRule]
    | ['itemSessionControl', ItemSessionControl]
    | ['timeLimits', TimeLimits]
    | ['variableMapping', VariableMapping]
    | ['weight', Weight]
    | ['templateDefault', TemplateDefault]
  )[];
}
export interface AssessmentItemRefCharacteristics {
  identifier: NormalizedString;
  required?: boolean;
  fixed?: boolean;
  href: AnyURI;
  category?: IdentifierList;
}

/**
 * # 5.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_AssociableHotspot
 */
export interface AssociableHotspot extends AssociableHotspotCharacteristics {
  $value: Empty;
}
export interface AssociableHotspotCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  matchGroup?: IdentifierList;
  shape: Shape;
  coords: Coords;
  hotspotLabel?: string;
  matchMax: NonNegativeInteger;
  matchMin?: NonNegativeInteger;
}

/**
 * # 5.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_AssociateInteraction
 */
export interface AssociateInteraction extends AssociateInteractionCharacteristics {
  $children: ['simpleAssociableChoice', SimpleAssociableChoice][];
}
export interface AssociateInteractionCharacteristics {
  shuffle?: boolean;
  maxAssociations?: NonNegativeInteger;
  minAssociations?: NonNegativeInteger;
}

/**
 * # 5.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BDO
 */
export interface BDO extends BDOCharacteristics {
  $children: (['$text', string] | ['inlineContentModel', InlineContentModel])[];
}
export interface BDOCharacteristics {
  title?: string;
}

/**
 * # 5.8
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BR
 */
export interface BR extends BRCharacteristics {
  $value: Empty;
}
export interface BRCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.9
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BasePromptInteraction
 */
export interface BasePromptInteraction extends BasePromptInteractionCharacteristics {
  $children: ['prompt', Prompt][];
}
export interface BasePromptInteractionCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  responseIdentifier: Identifier;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.10
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BaseSequence
 */
export type BaseSequence = BaseSequenceCharacteristics;
export interface BaseSequenceCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.11
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BaseSequenceFull
 */
export type BaseSequenceFull = BaseSequenceFullCharacteristics;
export interface BaseSequenceFullCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  responseIdentifier: Identifier;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.12
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BaseSequenceRIdent
 */
export type BaseSequenceRIdent = BaseSequenceRIdentCharacteristics;
export interface BaseSequenceRIdentCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  responseIdentifier: Identifier;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.13
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BaseSequenceXBase
 */
export type BaseSequenceXBase = BaseSequenceXBaseCharacteristics;
export interface BaseSequenceXBaseCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.14
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BlockQuote
 */
export interface BlockQuote extends BlockQuoteCharacteristics {
  $children: ['blockGroup', BlockGroup][];
}
export interface BlockQuoteCharacteristics {
  cite?: AnyURI;
}

/**
 * # 5.15
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_BranchRule
 */
export interface BranchRule extends BranchRuleCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface BranchRuleCharacteristics {
  target: Identifier;
}

/**
 * # 5.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Caption
 */
export interface Caption extends CaptionCharacteristics {
  $children: (['$text', string] | ['inlineGroup', InlineGroup])[];
}
export interface CaptionCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.17
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ChoiceInteraction
 */
export interface ChoiceInteraction extends ChoiceInteractionCharacteristics {
  $children: ['simpleChoice', SimpleChoice][];
}
export interface ChoiceInteractionCharacteristics {
  shuffle?: boolean;
  maxChoices?: NonNegativeInteger;
  minChoices?: NonNegativeInteger;
  orientation?: Orientation;
}

/**
 * # 5.18
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Col
 */
export interface Col extends ColCharacteristics {
  $value: Empty;
}
export interface ColCharacteristics {
  span?: Int;
}

/**
 * # 5.19
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ColGroup
 */
export interface ColGroup extends ColGroupCharacteristics {
  $children: ['col', Col][];
}
export interface ColGroupCharacteristics {
  span?: Int;
}

/**
 * # 5.20
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_CorrectResponse
 */
export interface CorrectResponse extends CorrectResponseCharacteristics {
  $children: ['value', Value][];
}
export interface CorrectResponseCharacteristics {
  interpretation?: string;
}

/**
 * # 5.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_CustomInteraction
 */
export interface CustomInteraction extends CustomInteractionCharacteristics {
  $children: ['extension', AnyTypeLax][];
}
export interface CustomInteractionCharacteristics {
  extension: NamespaceLax[];
}

/**
 * # 5.22
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_CustomOperator
 */
export interface CustomOperator extends CustomOperatorCharacteristics {
  $children: (['logic', ExpressionGroup] | ['extension', NamespaceLax])[];
}
export interface CustomOperatorCharacteristics {
  class?: Identifier;
  definition?: AnyURI;
  extension: NamespaceLax[];
}

/**
 * # 5.23
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_DD
 */
export interface DD extends DDCharacteristics {
  $children: (['$text', string] | ['flowGroup', FlowGroup])[];
}
export interface DDCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.24
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_DL
 */
export interface DL extends DLCharacteristics {
  $children: ['dlSelection', DLSelection][];
}
export interface DLCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.25
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_DT
 */
export interface DT extends DTCharacteristics {
  $children: (['$text', string] | ['inlineGroup', InlineGroup])[];
}
export interface DTCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.26
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_DefaultValue
 */
export interface DefaultValue extends DefaultValueCharacteristics {
  $children: ['value', Value][];
}
export interface DefaultValueCharacteristics {
  interpretation?: NormalizedString;
}

/**
 * # 5.27
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Div
 */
export interface Div extends DivCharacteristics {
  $children: (['$text', string] | ['divSelection', DivSelection])[];
}
export interface DivCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.28
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_DrawingInteraction
 */
export interface DrawingInteraction extends DrawingInteractionCharacteristics {
  $children: ['object', Object][];
}
export interface DrawingInteractionCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  responseIdentifier: Identifier;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.29
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_EndAttemptInteraction
 */
export interface EndAttemptInteraction extends EndAttemptInteractionCharacteristics {
  $value: Empty;
}
export interface EndAttemptInteractionCharacteristics {
  responseIdentifier: Identifier;
  title: string;
  countAttempt?: boolean;
}

/**
 * # 5.30
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Equal
 */
export interface Equal extends EqualCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface EqualCharacteristics {
  toleranceMode?: ToleranceMode;
  tolerance?: ToleranceList;
  includeLowerBound?: boolean;
  includeUpperBound?: boolean;
}

/**
 * # 5.31
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_EqualRounded
 */
export interface EqualRounded extends EqualRoundedCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface EqualRoundedCharacteristics {
  roundingMode?: RoundingMode;
  figures: IntegerOrVariableRef;
}

/**
 * # 5.32
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ExtendedTextInteraction
 */
export interface ExtendedTextInteraction extends ExtendedTextInteractionCharacteristics {
  $children: ['prompt', Prompt][];
}
export interface ExtendedTextInteractionCharacteristics {
  base?: Int;
  stringIdentifier?: Identifier;
  expectedLength?: NonNegativeInteger;
  patternMask?: string;
  placeholderText?: string;
  maxStrings?: NonNegativeInteger;
  minStrings?: NonNegativeInteger;
  expectedLines?: NonNegativeInteger;
  format?: TextFormat;
}

/**
 * # 5.33
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_FeedbackBlock
 */
export interface FeedbackBlock extends FeedbackBlockCharacteristics {
  $children: (
    | ['$text', string]
    | ['feedbackBlockStatic', FeedbackBlockStatic]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface FeedbackBlockCharacteristics {
  outcomeIdentifier: Identifier;
  identifier: Identifier;
  showHide?: ShowHide;
}

/**
 * # 5.34
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_FeedbackInline
 */
export interface FeedbackInline extends FeedbackInlineCharacteristics {
  $children: (['$text', string] | ['feedbackInlineGroup', FeedbackInlineGroup])[];
}
export interface FeedbackInlineCharacteristics {
  outcomeIdentifier: Identifier;
  identifier: Identifier;
  showHide?: ShowHide;
}

/**
 * # 5.35
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_FieldValue
 */
export interface FieldValue extends FieldValueCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface FieldValueCharacteristics {
  fieldIdentifier: Identifier;
}

/**
 * # 5.36
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Gap
 */
export interface Gap extends GapCharacteristics {
  $value: Empty;
}
export interface GapCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  matchGroup?: IdentifierList;
  required?: boolean;
}

/**
 * # 5.37
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GapImg
 */
export interface GapImg extends GapImgCharacteristics {
  $children: ['object', Object][];
}
export interface GapImgCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  matchGroup?: IdentifierList;
  matchMax: NonNegativeInteger;
  matchMin?: NonNegativeInteger;
  objectLabel?: string;
  top?: NormalizedString;
  left?: NormalizedString;
}

/**
 * # 5.38
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GapMatchInteraction
 */
export interface GapMatchInteraction extends GapMatchInteractionCharacteristics {
  $children: (['gapChoice', GapChoice] | ['blockStaticGroup', BlockStaticGroup])[];
}
export interface GapMatchInteractionCharacteristics {
  shuffle?: boolean;
  minAssociations?: NonNegativeInteger;
  maxAssociations?: NonNegativeInteger;
}

/**
 * # 5.39
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GapText
 */
export interface GapText extends GapTextCharacteristics {
  $children: (['$text', string] | ['inlineChoiceGroup', InlineChoiceGroup])[];
}
export interface GapTextCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  matchGroup?: IdentifierList;
  matchMax: NonNegativeInteger;
  matchMin?: NonNegativeInteger;
}

/**
 * # 5.40
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GraphicAssociateInteraction
 */
export interface GraphicAssociateInteraction extends GraphicAssociateInteractionCharacteristics {
  $children: (['object', Object] | ['associableHotspot', AssociableHotspot])[];
}
export interface GraphicAssociateInteractionCharacteristics {
  minAssociations?: NonNegativeInteger;
  maxAssociations?: NonNegativeInteger;
}

/**
 * # 5.41
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GraphicGapMatchInteraction
 */
export interface GraphicGapMatchInteraction extends GraphicGapMatchInteractionCharacteristics {
  $children: (
    | ['prompt', Prompt]
    | ['object', Object]
    | ['gapChoice', GapChoice]
    | ['associableHotspot', AssociableHotspot]
  )[];
}
export interface GraphicGapMatchInteractionCharacteristics {
  minAssociations?: NonNegativeInteger;
  maxAssociations?: NonNegativeInteger;
}

/**
 * # 5.42
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_GraphicOrderInteraction
 */
export interface GraphicOrderInteraction extends GraphicOrderInteractionCharacteristics {
  $children: (['prompt', Prompt] | ['object', Object] | ['hotspotChoice', HotspotChoice])[];
}
export interface GraphicOrderInteractionCharacteristics {
  minChoices?: NonNegativeInteger;
  maxChoices?: NonNegativeInteger;
}

/**
 * # 5.43
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HR
 */
export interface HR extends HRCharacteristics {
  $value: Empty;
}
export interface HRCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.44
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HTMLText
 */
export interface HTMLText extends HTMLTextCharacteristics {
  $children: (['$text', string] | ['inlineGroup', InlineGroup])[];
}
export interface HTMLTextCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.45
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HotText
 */
export interface HotText extends HotTextCharacteristics {
  $children: (['$text', string] | ['inlineChoiceGroup', InlineChoiceGroup])[];
}
export interface HotTextCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
}

/**
 * # 5.46
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HotTextInteraction
 */
export interface HotTextInteraction extends HotTextInteractionCharacteristics {
  $children: ['blockStaticGroup', BlockStaticGroup][];
}
export interface HotTextInteractionCharacteristics {
  maxChoices?: NonNegativeInteger;
  minChoices?: NonNegativeInteger;
}

/**
 * # 5.47
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HotspotChoice
 */
export interface HotspotChoice extends HotspotChoiceCharacteristics {
  $value: Empty;
}
export interface HotspotChoiceCharacteristics {
  identifier: Identifier;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  shape: Shape;
  coords: Coords;
  hotspotLabel?: string;
}

/**
 * # 5.48
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_HotspotInteraction
 */
export interface HotspotInteraction extends HotspotInteractionCharacteristics {
  $children: (['object', Object] | ['hotspotChoice', HotspotChoice])[];
}
export interface HotspotInteractionCharacteristics {
  minChoices?: NonNegativeInteger;
  maxChoices?: NonNegativeInteger;
}

/**
 * # 5.49
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Img
 */
export interface Img extends ImgCharacteristics {
  $value: Empty;
}
export interface ImgCharacteristics {
  src: AnyURI;
  alt: string;
  longdesc?: AnyURI;
  height?: Length;
  width?: Length;
}

/**
 * # 5.50
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Index
 */
export interface Index extends IndexCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface IndexCharacteristics {
  n: IntOrIdentifier;
}

/**
 * # 5.51
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_InfoControl
 */
export interface InfoControl extends InfoControlCharacteristics {
  $children: (['$text', string] | ['flowStaticGroup', FlowStaticGroup])[];
}
export interface InfoControlCharacteristics {
  title: NormalizedString;
}

/**
 * # 5.52
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_InlineChoice
 */
export interface InlineChoice extends InlineChoiceCharacteristics {
  $children: (['$text', string] | ['inlineChoiceGroup', InlineChoiceGroup])[];
}
export interface InlineChoiceCharacteristics {
  identifier: Identifier;
  fixed?: boolean;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
}

/**
 * # 5.53
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_InlineChoiceInteraction
 */
export interface InlineChoiceInteraction extends InlineChoiceInteractionCharacteristics {
  $children: (['label', Label] | ['inlineChoice', InlineChoice])[];
}
export interface InlineChoiceInteractionCharacteristics {
  shuffle?: boolean;
  required?: boolean;
}

/**
 * # 5.54
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Inside
 */
export interface Inside extends InsideCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface InsideCharacteristics {
  shape: Shape;
  coords: Coords;
}

/**
 * # 5.55
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_InterpolationTable
 */
export interface InterpolationTable extends InterpolationTableCharacteristics {
  $children: ['interpolationTableEntry', InterpolationTableEntry][];
}
export interface InterpolationTableCharacteristics {
  defaultValue?: string;
}

/**
 * # 5.56
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ItemBody
 */
export interface ItemBody extends ItemBodyCharacteristics {
  $children: ['itemBodySelect', ItemBodySelect][];
}
export interface ItemBodyCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
}

/**
 * # 5.57
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_LI
 */
export interface LI extends LICharacteristics {
  $children: (['$text', string] | ['flowGroup', FlowGroup])[];
}
export interface LICharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.58
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Label
 */
export interface Label extends LabelCharacteristics {
  $children: (['$text', string] | ['inlineChoiceGroup', InlineChoiceGroup])[];
}
export interface LabelCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.59
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Logic0toMany
 */
export interface Logic0toMany {
  $children: ['logic', ExpressionGroup][];
}

/**
 * # 5.60
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Logic1toMany
 */
export interface Logic1toMany {
  $children: ['logic', ExpressionGroup][];
}

/**
 * # 5.61
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_LogicPair
 */
export interface LogicPair {
  $children: ['logic', ExpressionGroup][];
}

/**
 * # 5.62
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_LogicSingle
 */
export interface LogicSingle {
  $children: ['logic', ExpressionGroup][];
}

/**
 * # 5.63
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_LookupOutcomeValue
 */
export interface LookupOutcomeValue extends LookupOutcomeValueCharacteristics {
  $children: ['expressionGroup', ExpressionGroup][];
}
export interface LookupOutcomeValueCharacteristics {
  identifier: Identifier;
}

/**
 * # 5.64
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Mapping
 */
export interface Mapping extends MappingCharacteristics {
  $children: ['mapEntry', MapEntry][];
}
export interface MappingCharacteristics {
  lowerBound?: Double;
  upperBound?: Double;
  defaultValue?: Double;
}

/**
 * # 5.65
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_MatchInteraction
 */
export interface MatchInteraction extends MatchInteractionCharacteristics {
  $children: ['simpleMatchSet', SimpleMatchSet][];
}
export interface MatchInteractionCharacteristics {
  shuffle?: boolean;
  maxAssociations?: NonNegativeInteger;
  minAssociations?: NonNegativeInteger;
}

/**
 * # 5.66
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_MatchTable
 */
export interface MatchTable extends MatchTableCharacteristics {
  $children: ['matchTableEntry', MatchTableEntry][];
}
export interface MatchTableCharacteristics {
  defaultValue?: string;
}

/**
 * # 5.67
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_MathOperator
 */
export interface MathOperator extends MathOperatorCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface MathOperatorCharacteristics {
  name: MathOperatorName;
}

/**
 * # 5.68
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_MediaInteraction
 */
export interface MediaInteraction extends MediaInteractionCharacteristics {
  $selection: ['object', Object] | ['audio', HTML5] | ['video', HTML5];
}
export interface MediaInteractionCharacteristics {
  autostart: boolean;
  minPlays?: NonNegativeInteger;
  maxPlays?: NonNegativeInteger;
  loop?: boolean;
  coords?: Coords;
}

/**
 * # 5.69
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ModalFeedback
 */
export interface ModalFeedback extends ModalFeedbackCharacteristics {
  $children: (
    | ['$text', string]
    | ['feedbackFlowStaticGroup', FeedbackFlowStaticGroup]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface ModalFeedbackCharacteristics {
  outcomeIdentifier: Identifier;
  showHide: ShowHide;
  identifier: Identifier;
  title?: NormalizedString;
}

/**
 * # 5.70
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_NumericLogic1toMany
 */
export interface NumericLogic1toMany {
  $children: ['logic', NumericExpressionGroup][];
}

/**
 * # 5.71
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OUL
 */
export interface OUL extends OULCharacteristics {
  $children: ['li', LI][];
}
export interface OULCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.72
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Object
 */
export interface Object extends ObjectCharacteristics {
  $children: (['$text', string] | ['objectFlowGroup', ObjectFlowGroup])[];
}
export interface ObjectCharacteristics {
  data: string;
  type: MimeType;
  width?: Length;
  height?: Length;
}

/**
 * # 5.73
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OrderInteraction
 */
export interface OrderInteraction extends OrderInteractionCharacteristics {
  $children: ['simpleChoice', SimpleChoice][];
}
export interface OrderInteractionCharacteristics {
  shuffle?: boolean;
  minChoices?: NonNegativeInteger;
  maxChoices?: NonNegativeInteger;
  orientation?: Orientation;
}

/**
 * # 5.74
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Ordering
 */
export interface Ordering extends OrderingCharacteristics {
  $children: ['extensions', NamespaceLax][];
}
export interface OrderingCharacteristics {
  shuffle?: boolean;
  extension?: Namespace;
}

/**
 * # 5.75
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OutcomeCondition
 */
export interface OutcomeCondition {
  $children: (['outcomeIf', OutcomeIf] | ['outcomeElseIf', OutcomeIf] | ['outcomeElse', OutcomeElse])[];
}

/**
 * # 5.76
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OutcomeElse
 */
export interface OutcomeElse {
  $children: ['outcomeRule', OutcomeRule][];
}

/**
 * # 5.77
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OutcomeIf
 */
export interface OutcomeIf {
  $children: (['expressionGroup', ExpressionGroup] | ['outcomeRule', OutcomeRule])[];
}

/**
 * # 5.78
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OutcomeProcessing
 */
export interface OutcomeProcessing {
  $children: ['outcomeRule', OutcomeRule][];
}

/**
 * # 5.79
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_OutcomeProcessingFragment
 */
export interface OutcomeProcessingFragment {
  $children: ['outcomeRule', OutcomeRule][];
}

/**
 * # 5.80
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_PatternMatch
 */
export interface PatternMatch extends PatternMatchCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface PatternMatchCharacteristics {
  pattern: StringOrVariableRef;
}

/**
 * # 5.81
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_PositionObjectInteraction
 */
export interface PositionObjectInteraction extends PositionObjectInteractionCharacteristics {
  $children: ['object', Object][];
}
export interface PositionObjectInteractionCharacteristics {
  centerPoint?: IntegerList;
  minChoices?: NonNegativeInteger;
  maxChoices?: NonNegativeInteger;
}

/**
 * # 5.82
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_PositionObjectStage
 */
export interface PositionObjectStage extends PositionObjectStageCharacteristics {
  $children: (['object', Object] | ['positionObjectInteraction', PositionObjectInteraction])[];
}
export interface PositionObjectStageCharacteristics {
  id?: UniqueIdentifier;
}

/**
 * # 5.83
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Prompt
 */
export interface Prompt extends PromptCharacteristics {
  $children: (['$text', string] | ['promptStaticGroup', PromptStaticGroup])[];
}
export interface PromptCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.84
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Q
 */
export interface Q extends QCharacteristics {
  $children: (['$text', string] | ['inlineGroup', InlineGroup])[];
}
export interface QCharacteristics {
  cite?: AnyURI;
}

/**
 * # 5.85
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Repeat
 */
export interface Repeat extends RepeatCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface RepeatCharacteristics {
  numberRepeats: IntOrIdentifier;
}

/**
 * # 5.86
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ResponseCondition
 */
export interface ResponseCondition {
  $children: (['responseIf', ResponseIf] | ['responseElseIf', ResponseIf] | ['responseElse', ResponseElse])[];
}

/**
 * # 5.87
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ResponseDeclaration
 */
export interface ResponseDeclaration extends ResponseDeclarationCharacteristics {
  $children: (
    | ['defaultValue', DefaultValue]
    | ['correctResponse', CorrectResponse]
    | ['mapping', Mapping]
    | ['areaMapping', AreaMapping]
  )[];
}
export interface ResponseDeclarationCharacteristics {
  identifier: UniqueIdentifier;
  cardinality: Cardinality;
  baseType?: BaseType;
}

/**
 * # 5.88
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ResponseElse
 */
export interface ResponseElse {
  $children: ['responseRuleGroup', ResponseRuleGroup][];
}

/**
 * # 5.89
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ResponseIf
 */
export interface ResponseIf {
  $children: (['expressionGroup', ExpressionGroup] | ['responseRuleGroup', ResponseRuleGroup])[];
}

/**
 * # 5.90
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_ResponseProcessingFragment
 */
export interface ResponseProcessingFragment {
  $children: ['responseRuleGroup', ResponseRuleGroup][];
}

/**
 * # 5.91
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_RoundTo
 */
export interface RoundTo extends RoundToCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface RoundToCharacteristics {
  roundingMode: RoundingMode;
  figures: IntegerOrVariableRef;
}

/**
 * # 5.92
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_RubricBlock
 */
export interface RubricBlock extends RubricBlockCharacteristics {
  $children: (
    | ['$text', string]
    | ['contentModel', RubricBlockContentModel]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface RubricBlockCharacteristics {
  use?: NormalizedString;
  view: View;
}

/**
 * # 5.93
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_RubricBlockTemplateBlock
 */
export interface RubricBlockTemplateBlock extends RubricBlockTemplateBlockCharacteristics {
  $children: (
    | ['$text', string]
    | ['rtBlockContentModel', RubricTemplateBlockContentModel]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface RubricBlockTemplateBlockCharacteristics {
  templateIdentifier: Identifier;
  showHide?: ShowHide;
  identifier: Identifier;
}

/**
 * # 5.94
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_RubricBlockTemplateInline
 */
export interface RubricBlockTemplateInline extends RubricBlockTemplateInlineCharacteristics {
  $children: (['$text', string] | ['rtInlineStaticGroup', RubricTemplateInlineStaticGroup])[];
}
export interface RubricBlockTemplateInlineCharacteristics {
  templateIdentifier: Identifier;
  showHide?: ShowHide;
  identifier: Identifier;
}

/**
 * # 5.95
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SelectPointInteraction
 */
export interface SelectPointInteraction extends SelectPointInteractionCharacteristics {
  $children: ['object', Object][];
}
export interface SelectPointInteractionCharacteristics {
  minChoices?: NonNegativeInteger;
  maxChoices?: NonNegativeInteger;
}

/**
 * # 5.96
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Selection
 */
export interface Selection extends SelectionCharacteristics {
  $children: ['extensions', NamespaceLax][];
}
export interface SelectionCharacteristics {
  select: Int;
  withReplacement?: boolean;
  extension?: Namespace;
}

/**
 * # 5.97
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SetValue
 */
export interface SetValue extends SetValueCharacteristics {
  $children: ['expressionGroup', ExpressionGroup][];
}
export interface SetValueCharacteristics {
  identifier: Identifier;
}

/**
 * # 5.98
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SimpleAssociableChoice
 */
export interface SimpleAssociableChoice extends SimpleAssociableChoiceCharacteristics {
  $children: (['$text', string] | ['flowStaticGroup', FlowStaticGroup])[];
}
export interface SimpleAssociableChoiceCharacteristics {
  identifier: Identifier;
  fixed?: boolean;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
  matchGroup?: IdentifierList;
  matchMax: NonNegativeInteger;
  matchMin?: NonNegativeInteger;
}

/**
 * # 5.99
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SimpleChoice
 */
export interface SimpleChoice extends SimpleChoiceCharacteristics {
  $children: (['$text', string] | ['flowStaticGroup', FlowStaticGroup])[];
}
export interface SimpleChoiceCharacteristics {
  identifier: Identifier;
  fixed?: boolean;
  templateIdentifier?: Identifier;
  showHide?: ShowHide;
}

/**
 * # 5.100
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SimpleMatchSet
 */
export interface SimpleMatchSet extends SimpleMatchSetCharacteristics {
  $children: ['simpleAssociableChoice', SimpleAssociableChoice][];
}
export interface SimpleMatchSetCharacteristics {
  id?: UniqueIdentifier;
}

/**
 * # 5.101
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_SliderInteraction
 */
export interface SliderInteraction extends SliderInteractionCharacteristics {
  $children: ['prompt', Prompt][];
}
export interface SliderInteractionCharacteristics {
  lowerBound: NonNegativeDouble;
  upperBound: NonNegativeDouble;
  step?: NonNegativeDouble;
  stepLabel?: boolean;
  orientation?: Orientation;
  reverse?: boolean;
}

/**
 * # 5.102
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_StatsOperator
 */
export interface StatsOperator extends StatsOperatorCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface StatsOperatorCharacteristics {
  name: StatsOperatorName;
}

/**
 * # 5.103
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_StimulusBody
 */
export interface StimulusBody extends StimulusBodyCharacteristics {
  $children: ['blockGroup', BlockGroup][];
}
export interface StimulusBodyCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.104
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_StringMatch
 */
export interface StringMatch extends StringMatchCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface StringMatchCharacteristics {
  caseSensitive: boolean;
  substring?: boolean;
}

/**
 * # 5.105
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Substring
 */
export interface Substring extends SubstringCharacteristics {
  $children: ['logic', ExpressionGroup][];
}
export interface SubstringCharacteristics {
  caseSensitive: boolean;
}

/**
 * # 5.106
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TDH
 */
export interface TDH extends TDHCharacteristics {
  $children: (['$text', string] | ['flowGroup', FlowGroup])[];
}
export interface TDHCharacteristics {
  headers?: IdentifierList;
  scope?: TableCellScope;
  abbr?: string;
  axis?: string;
  rowspan?: Int;
  colspan?: Int;
  align?: Align;
  valign?: Valign;
}

/**
 * # 5.107
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TR
 */
export interface TR extends TRCharacteristics {
  $children: ['tableCellGroup', TableCellGroup][];
}
export interface TRCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.108
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_Table
 */
export interface Table extends TableCharacteristics {
  $children: (
    | ['caption', Caption]
    | ['col', Col]
    | ['colgroup', ColGroup]
    | ['thead', TablePart]
    | ['tfoot', TablePart]
    | ['tbody', TablePart]
  )[];
}
export interface TableCharacteristics {
  summary?: string;
}

/**
 * # 5.109
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TablePart
 */
export interface TablePart extends TablePartCharacteristics {
  $children: ['tr', TR][];
}
export interface TablePartCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 5.110
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateBlock
 */
export interface TemplateBlock extends TemplateBlockCharacteristics {
  $children: (
    | ['$text', string]
    | ['fatBlockStatic', FeedandTempBlockStatic]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface TemplateBlockCharacteristics {
  templateIdentifier: Identifier;
  showHide?: ShowHide;
  identifier: Identifier;
}

/**
 * # 5.111
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateBlockFeedbackBlock
 */
export interface TemplateBlockFeedbackBlock extends TemplateBlockFeedbackBlockCharacteristics {
  $children: (
    | ['$text', string]
    | ['fatBlockStatic', FeedandTempBlockStatic]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface TemplateBlockFeedbackBlockCharacteristics {
  outcomeIdentifier: Identifier;
  showHide?: ShowHide;
  identifier: Identifier;
}

/**
 * # 5.112
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateCondition
 */
export interface TemplateCondition {
  $children: (['templateIf', TemplateIf] | ['templateElseIf', TemplateIf] | ['templateElse', TemplateElse])[];
}

/**
 * # 5.113
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateConstraint
 */
export interface TemplateConstraint {
  $children: ['expressionGroup', ExpressionGroup][];
}

/**
 * # 5.114
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateDeclaration
 */
export interface TemplateDeclaration extends TemplateDeclarationCharacteristics {
  $children: ['defaultValue', DefaultValue][];
}
export interface TemplateDeclarationCharacteristics {
  identifier: Identifier;
  cardinality: Cardinality;
  baseType?: BaseType;
  paramVariable?: boolean;
  mathVariable?: boolean;
}

/**
 * # 5.115
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateDefault
 */
export interface TemplateDefault extends TemplateDefaultCharacteristics {
  $children: ['expressionGroup', ExpressionGroup][];
}
export interface TemplateDefaultCharacteristics {
  templateIdentifier: Identifier;
}

/**
 * # 5.116
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateElse
 */
export interface TemplateElse {
  $children: ['templateRuleGroup', TemplateRuleGroup][];
}

/**
 * # 5.117
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateIf
 */
export interface TemplateIf {
  $children: (['expressionGroup', ExpressionGroup] | ['templateRuleGroup', TemplateRuleGroup])[];
}

/**
 * # 5.118
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateInline
 */
export interface TemplateInline extends TemplateInlineCharacteristics {
  $children: (['$text', string] | ['inlineStaticGroup', InlineStaticGroup])[];
}
export interface TemplateInlineCharacteristics {
  templateIdentifier: Identifier;
  showHide?: ShowHide;
  identifier: Identifier;
}

/**
 * # 5.119
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TemplateProcessing
 */
export interface TemplateProcessing {
  $children: ['templateRuleGroup', TemplateRuleGroup][];
}

/**
 * # 5.120
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TestFeedback
 */
export interface TestFeedback extends TestFeedbackCharacteristics {
  $children: (
    | ['$text', string]
    | ['feedbackFlowStaticGroup', FeedbackFlowStaticGroup]
    | ['stylesheet', StyleSheet]
    | ['apipAccessibility', APIPAccessibility]
  )[];
}
export interface TestFeedbackCharacteristics {
  access: TestFeedbackAccess;
  outcomeIdentifier: Identifier;
  showHide: ShowHide;
  identifier: Identifier;
  title?: NormalizedString;
}

/**
 * # 5.121
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TestPart
 */
export interface TestPart extends TestPartCharacteristics {
  $children: (
    | ['preCondition', LogicSingle]
    | ['branchRule', BranchRule]
    | ['itemSessionControl', ItemSessionControl]
    | ['timeLimits', TimeLimits]
    | ['assessmentSectionSelection', AssessmentSectionSelection]
    | ['testFeedback', TestFeedback]
  )[];
}
export interface TestPartCharacteristics {
  identifier: NormalizedString;
  navigationMode: NavigationMode;
  submissionMode: SubmissionMode;
}

/**
 * # 5.122
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_TextEntryInteraction
 */
export interface TextEntryInteraction extends TextEntryInteractionCharacteristics {
  $value: Empty;
}
export interface TextEntryInteractionCharacteristics {
  responseIdentifier: UniqueIdentifierRef;
  base?: Int;
  stringIdentifier?: UniqueIdentifierRef;
  expectedLength?: NonNegativeInteger;
  patternMask?: string;
  placeholderText?: string;
  format?: NormalizedString;
}

/**
 * # 5.123
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabCoreClass_DataModel_UploadInteraction
 */
export interface UploadInteraction extends UploadInteractionCharacteristics {
  $children: ['prompt', Prompt][];
}
export interface UploadInteractionCharacteristics {
  type?: MimeTypeList;
}

/**
 * # 6.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_AssessmentSectionSelection
 */
export interface AssessmentSectionSelection {
  $selection: ['assessmentSection', AssessmentSection] | ['assessmentSectionRef', AssessmentSectionRef];
}

/**
 * # 6.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_BlockContentModel
 */
export interface BlockContentModel {
  $selection:
    | ['pre', HTMLText]
    | ['h1', HTMLText]
    | ['h2', HTMLText]
    | ['h3', HTMLText]
    | ['h4', HTMLText]
    | ['h5', HTMLText]
    | ['h6', HTMLText]
    | ['p', HTMLText]
    | ['address', HTMLText]
    | ['dl', DL]
    | ['ol', OUL]
    | ['ul', OUL]
    | ['hr', HR]
    | ['blockquote', BlockQuote]
    | ['table', Table]
    | ['div', Div]
    | ['article', HTML5]
    | ['aside', HTML5]
    | ['audio', HTML5]
    | ['figure', HTML5]
    | ['footer', HTML5]
    | ['header', HTML5]
    | ['nav', HTML5]
    | ['section', HTML5]
    | ['video', HTML5];
}

/**
 * # 6.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_BlockGroup
 */
export interface BlockGroup {
  $selection:
    | ['positionObjectStage', PositionObjectStage]
    | ['customInteraction', CustomInteraction]
    | ['drawingInteraction', DrawingInteraction]
    | ['gapMatchInteraction', GapMatchInteraction]
    | ['matchInteraction', MatchInteraction]
    | ['graphicGapMatchInteraction', GraphicGapMatchInteraction]
    | ['hotspotInteraction', HotspotInteraction]
    | ['graphicOrderInteraction', GraphicOrderInteraction]
    | ['selectPointInteraction', SelectPointInteraction]
    | ['graphicAssociateInteraction', GraphicAssociateInteraction]
    | ['sliderInteraction', SliderInteraction]
    | ['choiceInteraction', ChoiceInteraction]
    | ['mediaInteraction', MediaInteraction]
    | ['hottextInteraction', HotTextInteraction]
    | ['orderInteraction', OrderInteraction]
    | ['extendedTextInteraction', ExtendedTextInteraction]
    | ['uploadInteraction', UploadInteraction]
    | ['associateInteraction', AssociateInteraction]
    | ['feedbackBlock', FeedbackBlock]
    | ['templateBlock', TemplateBlock]
    | ['infoControl', InfoControl]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['blockContentModel', BlockContentModel];
}

/**
 * # 6.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_BlockStaticGroup
 */
export interface BlockStaticGroup {
  $selection:
    | ['feedbackBlock', FeedbackBlock]
    | ['templateBlock', TemplateBlock]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['blockContentModel', BlockContentModel];
}

/**
 * # 6.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_DLSelection
 */
export interface DLSelection {
  $selection: ['dd', DD] | ['dt', DT];
}

/**
 * # 6.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_DivSelection
 */
export interface DivSelection {
  $selection: ['positionObjectStage', PositionObjectStage] | ['flowGroup', FlowGroup];
}

/**
 * # 6.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_ExpressionGroup
 */
export interface ExpressionGroup {
  $selection:
    | ['and', Logic1toMany]
    | ['gt', LogicPair]
    | ['not', LogicSingle]
    | ['lt', LogicPair]
    | ['gte', LogicPair]
    | ['lte', LogicPair]
    | ['or', Logic1toMany]
    | ['sum', NumericLogic1toMany]
    | ['durationLT', LogicPair]
    | ['durationGTE', LogicPair]
    | ['subtract', LogicPair]
    | ['divide', LogicPair]
    | ['multiple', Logic0toMany]
    | ['ordered', Logic0toMany]
    | ['customOperator', CustomOperator]
    | ['random', LogicSingle]
    | ['numberIncorrect', number]
    | ['numberCorrect', number]
    | ['numberPresented', number]
    | ['numberResponded', number]
    | ['numberSelected', number]
    | ['substring', Substring]
    | ['equalRounded', EqualRounded]
    | ['null', Empty]
    | ['delete', LogicPair]
    | ['match', LogicPair]
    | ['index', Index]
    | ['power', LogicPair]
    | ['equal', Equal]
    | ['contains', LogicPair]
    | ['containerSize', LogicSingle]
    | ['correct', Correct]
    | ['default', Default]
    | ['anyN', AnyN]
    | ['integerDivide', LogicPair]
    | ['integerModulus', LogicPair]
    | ['isNull', LogicSingle]
    | ['member', LogicPair]
    | ['product', Logic1toMany]
    | ['round', LogicSingle]
    | ['truncate', LogicSingle]
    | ['fieldValue', FieldValue]
    | ['randomInteger', RandomInteger]
    | ['randomFloat', RandomFloat]
    | ['variable', Variable]
    | ['outcomeMinimum', OutcomeMinMax]
    | ['outcomeMaximum', OutcomeMinMax]
    | ['testVariables', TestVariables]
    | ['integerToFloat', LogicSingle]
    | ['inside', Inside]
    | ['baseValue', BaseValue]
    | ['patternMatch', PatternMatch]
    | ['mapResponsePoint', MapResponse]
    | ['mapResponse', MapResponse]
    | ['stringMatch', StringMatch]
    | ['repeat', Repeat]
    | ['roundTo', RoundTo]
    | ['lcm', Logic1toMany]
    | ['gcd', Logic1toMany]
    | ['min', Logic1toMany]
    | ['max', Logic1toMany]
    | ['mathConstant', MathConstant]
    | ['statsOperator', StatsOperator]
    | ['mathOperator', MathOperator];
}

/**
 * # 6.8
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FeedandTempBlockStatic
 */
export interface FeedandTempBlockStatic {
  $selection:
    | ['flowContentModel', FlowContentModel]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['templateBlock', TemplateBlock]
    | ['templateInline', TemplateInline]
    | ['feedbackBlock', TemplateBlockFeedbackBlock]
    | ['feedbackInline', FeedbackInline]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.9
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FeedbackBlockStatic
 */
export interface FeedbackBlockStatic {
  $selection:
    | ['blockGroup', BlockGroup]
    | ['inlineContentModel', InlineContentModel]
    | ['templateInline', TemplateInline]
    | ['feedbackInline', FeedbackInline]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.10
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FeedbackFlowStaticGroup
 */
export interface FeedbackFlowStaticGroup {
  $selection:
    | ['printedVariable', PrintedVariable]
    | ['hottext', HotText]
    | ['templateInline', TemplateInline]
    | ['templateBlock', TemplateBlock]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['flowContentModel', FlowContentModel];
}

/**
 * # 6.11
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FeedbackInlineGroup
 */
export interface FeedbackInlineGroup {
  $selection:
    | ['inlineContentModel', InlineContentModel]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['templateInline', TemplateInline]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.12
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FlowContentModel
 */
export interface FlowContentModel {
  $selection:
    | ['pre', HTMLText]
    | ['h1', HTMLText]
    | ['h2', HTMLText]
    | ['h3', HTMLText]
    | ['h4', HTMLText]
    | ['h5', HTMLText]
    | ['h6', HTMLText]
    | ['p', HTMLText]
    | ['address', HTMLText]
    | ['dl', DL]
    | ['ol', OUL]
    | ['ul', OUL]
    | ['br', BR]
    | ['hr', HR]
    | ['img', Img]
    | ['object', Object]
    | ['blockquote', BlockQuote]
    | ['em', HTMLText]
    | ['a', A]
    | ['code', HTMLText]
    | ['span', HTMLText]
    | ['sub', HTMLText]
    | ['acronym', HTMLText]
    | ['big', HTMLText]
    | ['tt', HTMLText]
    | ['kbd', HTMLText]
    | ['q', Q]
    | ['i', HTMLText]
    | ['dfn', HTMLText]
    | ['abbr', HTMLText]
    | ['strong', HTMLText]
    | ['sup', HTMLText]
    | ['var', HTMLText]
    | ['small', HTMLText]
    | ['samp', HTMLText]
    | ['b', HTMLText]
    | ['cite', HTMLText]
    | ['table', Table]
    | ['div', Div]
    | ['bdo', BDO]
    | ['bdi', HTML5]
    | ['figure', HTML5]
    | ['audio', HTML5]
    | ['video', HTML5]
    | ['article', HTML5]
    | ['aside', HTML5]
    | ['footer', HTML5]
    | ['header', HTML5]
    | ['label', HTML5]
    | ['nav', HTML5]
    | ['section', HTML5]
    | ['ruby', HTML5]
    | ['ssmlGroup', SSMLGroup];
}

/**
 * # 6.13
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FlowGroup
 */
export interface FlowGroup {
  $selection:
    | ['printedVariable', PrintedVariable]
    | ['feedbackBlock', FeedbackBlock]
    | ['hottext', HotText]
    | ['feedbackInline', FeedbackInline]
    | ['templateInline', TemplateInline]
    | ['templateBlock', TemplateBlock]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['textEntryInteraction', TextEntryInteraction]
    | ['inlineChoiceInteraction', InlineChoiceInteraction]
    | ['endAttemptInteraction', EndAttemptInteraction]
    | ['customInteraction', CustomInteraction]
    | ['drawingInteraction', DrawingInteraction]
    | ['gapMatchInteraction', GapMatchInteraction]
    | ['matchInteraction', MatchInteraction]
    | ['graphicGapMatchInteraction', GraphicGapMatchInteraction]
    | ['hotspotInteraction', HotspotInteraction]
    | ['graphicOrderInteraction', GraphicOrderInteraction]
    | ['selectPointInteraction', SelectPointInteraction]
    | ['graphicAssociateInteraction', GraphicAssociateInteraction]
    | ['sliderInteraction', SliderInteraction]
    | ['choiceInteraction', ChoiceInteraction]
    | ['mediaInteraction', MediaInteraction]
    | ['hottextInteraction', HotTextInteraction]
    | ['orderInteraction', OrderInteraction]
    | ['extendedTextInteraction', ExtendedTextInteraction]
    | ['uploadInteraction', UploadInteraction]
    | ['associateInteraction', AssociateInteraction]
    | ['flowContentModel', FlowContentModel];
}

/**
 * # 6.14
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_FlowStaticGroup
 */
export interface FlowStaticGroup {
  $selection:
    | ['printedVariable', PrintedVariable]
    | ['feedbackBlock', FeedbackBlock]
    | ['feedbackInline', FeedbackInline]
    | ['templateInline', TemplateInline]
    | ['templateBlock', TemplateBlock]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['flowContentModel', FlowContentModel];
}

/**
 * # 6.15
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_GapChoice
 */
export interface GapChoice {
  $selection: ['gapText', GapText] | ['gapImg', GapImg];
}

/**
 * # 6.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_InlineChoiceGroup
 */
export interface InlineChoiceGroup {
  $selection:
    | ['printedVariable', PrintedVariable]
    | ['feedbackInline', FeedbackInline]
    | ['templateInline', TemplateInline]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['inlineContentModel', InlineContentModel];
}

/**
 * # 6.17
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_InlineContentModel
 */
export interface InlineContentModel {
  $selection:
    | ['img', Img]
    | ['br', BR]
    | ['object', Object]
    | ['em', HTMLText]
    | ['a', A]
    | ['code', HTMLText]
    | ['span', HTMLText]
    | ['sub', HTMLText]
    | ['acronym', HTMLText]
    | ['big', HTMLText]
    | ['tt', HTMLText]
    | ['kbd', HTMLText]
    | ['q', Q]
    | ['i', HTMLText]
    | ['dfn', HTMLText]
    | ['abbr', HTMLText]
    | ['strong', HTMLText]
    | ['sup', HTMLText]
    | ['var', HTMLText]
    | ['small', HTMLText]
    | ['samp', HTMLText]
    | ['b', HTMLText]
    | ['cite', HTMLText]
    | ['bdo', BDO]
    | ['bdi', HTML5]
    | ['label', HTML5]
    | ['ruby', HTML5]
    | ['ssml11Group', SSMLGroup];
}

/**
 * # 6.18
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_InlineGroup
 */
export interface InlineGroup {
  $selection:
    | ['textEntryInteraction', TextEntryInteraction]
    | ['hottext', HotText]
    | ['printedVariable', PrintedVariable]
    | ['gap', Gap]
    | ['feedbackInline', FeedbackInline]
    | ['templateInline', TemplateInline]
    | ['inlineChoiceInteraction', InlineChoiceInteraction]
    | ['endAttemptInteraction', EndAttemptInteraction]
    | ['customInteraction', CustomInteraction]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['inlineContentModel', InlineContentModel];
}

/**
 * # 6.19
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_InlineStaticGroup
 */
export interface InlineStaticGroup {
  $selection:
    | ['hottext', HotText]
    | ['printedVariable', PrintedVariable]
    | ['gap', Gap]
    | ['feedbackInline', FeedbackInline]
    | ['templateInline', TemplateInline]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['inlineContentModel', InlineContentModel];
}

/**
 * # 6.20
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_ItemBodySelect
 */
export interface ItemBodySelect {
  $selection: ['rubricBlock', RubricBlock] | ['blockGroup', BlockGroup];
}

/**
 * # 6.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_LookupTable
 */
export interface LookupTable {
  $selection: ['matchTable', MatchTable] | ['interpolationTable', InterpolationTable];
}

/**
 * # 6.22
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_NumericExpressionGroup
 */
export interface NumericExpressionGroup {
  $selection:
    | ['sum', NumericLogic1toMany]
    | ['subtract', LogicPair]
    | ['divide', LogicPair]
    | ['multiple', Logic0toMany]
    | ['ordered', Logic0toMany]
    | ['customOperator', CustomOperator]
    | ['random', LogicSingle]
    | ['numberIncorrect', number]
    | ['numberCorrect', number]
    | ['numberPresented', number]
    | ['numberResponded', number]
    | ['numberSelected', number]
    | ['null', Empty]
    | ['delete', LogicPair]
    | ['index', Index]
    | ['power', LogicPair]
    | ['containerSize', LogicSingle]
    | ['correct', Correct]
    | ['default', Default]
    | ['integerDivide', LogicPair]
    | ['integerModulus', LogicPair]
    | ['product', Logic1toMany]
    | ['round', LogicSingle]
    | ['truncate', LogicSingle]
    | ['fieldValue', FieldValue]
    | ['randomInteger', RandomInteger]
    | ['variable', Variable]
    | ['outcomeMinimum', OutcomeMinMax]
    | ['outcomeMaximum', OutcomeMinMax]
    | ['testVariables', TestVariables]
    | ['integerToFloat', LogicSingle]
    | ['baseValue', BaseValue]
    | ['mapResponsePoint', MapResponse]
    | ['mapResponse', MapResponse]
    | ['repeat', Repeat]
    | ['roundTo', RoundTo]
    | ['lcm', Logic1toMany]
    | ['gcd', Logic1toMany]
    | ['min', Logic1toMany]
    | ['max', Logic1toMany]
    | ['mathConstant', MathConstant]
    | ['statsOperator', StatsOperator]
    | ['mathOperator', MathOperator]
    | ['randomFloat', RandomFloat];
}

/**
 * # 6.23
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_ObjectFlowGroup
 */
export interface ObjectFlowGroup {
  $selection:
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['param', Param]
    | ['flowContentModel', FlowContentModel];
}

/**
 * # 6.24
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_OutcomeRule
 */
export interface OutcomeRule {
  $selection:
    | ['lookupOutcomeValue', LookupOutcomeValue]
    | ['outcomeProcessingFragment', OutcomeProcessingFragment]
    | ['setOutcomeValue', SetValue]
    | ['include', Include]
    | ['exitTest', Empty]
    | ['outcomeCondition', OutcomeCondition];
}

/**
 * # 6.25
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_PromptStaticGroup
 */
export interface PromptStaticGroup {
  $selection: ['math', MathML2] | ['math', MathML2] | ['include', Include] | ['flowContentModel', FlowContentModel];
}

/**
 * # 6.26
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_ResponseRuleGroup
 */
export interface ResponseRuleGroup {
  $selection:
    | ['include', Include]
    | ['responseCondition', ResponseCondition]
    | ['responseProcessingFragment', ResponseProcessingFragment]
    | ['setOutcomeValue', SetValue]
    | ['exitResponse', Empty]
    | ['lookupOutcomeValue', LookupOutcomeValue];
}

/**
 * # 6.27
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_RubricBlockContentModel
 */
export interface RubricBlockContentModel {
  $selection:
    | ['flowContentModel', FlowContentModel]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['templateBlock', RubricBlockTemplateBlock]
    | ['templateInline', RubricBlockTemplateInline]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.28
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_RubricTemplateBlockContentModel
 */
export interface RubricTemplateBlockContentModel {
  $selection:
    | ['flowContentModel', FlowContentModel]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['templateBlock', RubricBlockTemplateBlock]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.29
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_RubricTemplateInlineStaticGroup
 */
export interface RubricTemplateInlineStaticGroup {
  $selection:
    | ['inlineContentModel', InlineContentModel]
    | ['math', MathML2]
    | ['math', MathML2]
    | ['include', Include]
    | ['templateInline', RubricBlockTemplateInline]
    | ['printedVariable', PrintedVariable];
}

/**
 * # 6.30
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_SSMLGroup
 */
export interface SSMLGroup {
  $selection:
    | ['p', SSMLv1p1]
    | ['s', SSMLv1p1]
    | ['say-as', SSMLv1p1]
    | ['phoneme', SSMLv1p1]
    | ['sub', SSMLv1p1]
    | ['voice', SSMLv1p1]
    | ['emphasis', SSMLv1p1]
    | ['break', SSMLv1p1]
    | ['prosody', SSMLv1p1]
    | ['mark', SSMLv1p1]
    | ['audio', SSMLv1p1]
    | ['speak', SSMLv1p1];
}

/**
 * # 6.31
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_SectionPart
 */
export interface SectionPart {
  $selection:
    | ['include', Include]
    | ['assessmentItemRef', AssessmentItemRef]
    | ['assessmentSection', AssessmentSection]
    | ['assessmentSectionRef', AssessmentSectionRef];
}

/**
 * # 6.32
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_TableCellGroup
 */
export interface TableCellGroup {
  $selection: ['td', TDH] | ['th', TDH];
}

/**
 * # 6.33
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabAbstractClass_DataModel_TemplateRuleGroup
 */
export interface TemplateRuleGroup {
  $selection:
    | ['setTemplateValue', SetValue]
    | ['exitTemplate', Empty]
    | ['templateCondition', TemplateCondition]
    | ['setDefaultValue', SetValue]
    | ['setCorrectResponse', SetValue]
    | ['templateConstraint', TemplateConstraint];
}

/**
 * # 7.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_ARIALevelInteger
 */
export interface ARIALevelInteger extends ARIALevelIntegerAttributes {
  $value: Integer;
}
export interface ARIALevelIntegerAttributes {
  minInclusive: Integer;
}

/**
 * # 7.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_AreaMapEntry
 */
export interface AreaMapEntry extends AreaMapEntryCharacteristics {
  $value: Empty;
}
export interface AreaMapEntryCharacteristics {
  shape: Shape;
  coords: Coords;
  mappedValue: Double;
}

/**
 * # 7.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_AssessmentSectionRef
 */
export interface AssessmentSectionRef extends AssessmentSectionRefCharacteristics {
  $value: Empty;
}
export interface AssessmentSectionRefCharacteristics {
  identifier: NormalizedString;
  href: AnyURI;
}

/**
 * # 7.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_AssessmentStimulusRef
 */
export interface AssessmentStimulusRef extends AssessmentStimulusRefCharacteristics {
  $value: Empty;
}
export interface AssessmentStimulusRefCharacteristics {
  identifier: NormalizedString;
  href: AnyURI;
}

/**
 * # 7.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_BaseSequenceXBaseEmpty
 */
export interface BaseSequenceXBaseEmpty extends BaseSequenceXBaseEmptyCharacteristics {
  $value: Empty;
}
export interface BaseSequenceXBaseEmptyCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  base?: Base;
  dir?: DIR;
  role?: ARIARoleValue;
  'aria-controls'?: IDREFS;
  'aria-describedby'?: IDREFS;
  'aria-flowto'?: IDREFS;
  'aria-label'?: NormalizedString;
  'aria-labelledby'?: IDREFS;
  'aria-level'?: ARIALevelInteger;
  'aria-live'?: ARIALiveValue;
  'aria-orientation'?: ARIAOrientationValue;
  'aria-owns'?: IDREFS;
  dataExtension: DataHTML5Extension[];
}

/**
 * # 7.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_BaseValue
 */
export interface BaseValue extends BaseValueCharacteristics {
  $value: string;
}
export interface BaseValueCharacteristics {
  baseType: BaseType;
}

/**
 * # 7.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Coords
 */
export interface Coords extends CoordsAttributes {
  $value: NormalizedString;
}
export interface CoordsAttributes {
  pattern: string;
}

/**
 * # 7.8
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Correct
 */
export interface Correct extends CorrectCharacteristics {
  $value: Empty;
}
export interface CorrectCharacteristics {
  identifier: Identifier;
}

/**
 * # 7.9
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_DataHTML5Extension
 */
export interface DataHTML5Extension extends DataHTML5ExtensionAttributes {
  $value: AnyTypeLax;
}
export interface DataHTML5ExtensionAttributes {
  pattern: string;
}

/**
 * # 7.10
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Default
 */
export interface Default extends DefaultCharacteristics {
  $value: Empty;
}
export interface DefaultCharacteristics {
  identifier: Identifier;
}

/**
 * # 7.11
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_EncVariableString
 */
export interface EncVariableString extends EncVariableStringAttributes {
  $value: string;
}
export interface EncVariableStringAttributes {
  pattern: string;
}

/**
 * # 7.12
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Identifier
 */
export interface Identifier {
  $value: NCName;
}

/**
 * # 7.13
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_InterpolationTableEntry
 */
export interface InterpolationTableEntry extends InterpolationTableEntryCharacteristics {
  $value: Empty;
}
export interface InterpolationTableEntryCharacteristics {
  sourceValue: Double;
  includeBoundary?: boolean;
  targetValue: string;
}

/**
 * # 7.14
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_ItemSessionControl
 */
export interface ItemSessionControl extends ItemSessionControlCharacteristics {
  $value: Empty;
}
export interface ItemSessionControlCharacteristics {
  maxAttempts?: Int;
  showFeedback?: boolean;
  allowReview?: boolean;
  showSolution?: boolean;
  allowComment?: boolean;
  allowSkipping?: boolean;
  validateResponses?: boolean;
}

/**
 * # 7.15
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Length
 */
export interface Length extends LengthAttributes {
  $value: string;
}
export interface LengthAttributes {
  pattern: string;
}

/**
 * # 7.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_MapEntry
 */
export interface MapEntry extends MapEntryCharacteristics {
  $value: Empty;
}
export interface MapEntryCharacteristics {
  mapKey: NormalizedString;
  mappedValue: Double;
  caseSensitive?: boolean;
}

/**
 * # 7.17
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_MapResponse
 */
export interface MapResponse extends MapResponseCharacteristics {
  $value: Empty;
}
export interface MapResponseCharacteristics {
  identifier: Identifier;
}

/**
 * # 7.18
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_MatchTableEntry
 */
export interface MatchTableEntry extends MatchTableEntryCharacteristics {
  $value: Empty;
}
export interface MatchTableEntryCharacteristics {
  sourceValue: Int;
  targetValue: BaseType;
}

/**
 * # 7.19
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_MathConstant
 */
export interface MathConstant extends MathConstantCharacteristics {
  $value: Empty;
}
export interface MathConstantCharacteristics {
  name: MathConstantNames;
}

/**
 * # 7.20
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_MimeType
 */
export interface MimeType extends MimeTypeAttributes {
  $value: NormalizedString;
}
export interface MimeTypeAttributes {
  pattern: string;
}

/**
 * # 7.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_NonNegativeDouble
 */
export interface NonNegativeDouble extends NonNegativeDoubleAttributes {
  $value: Double;
}
export interface NonNegativeDoubleAttributes {
  minInclusive: Double;
}

/**
 * # 7.22
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Number
 */
export interface Number extends NumberCharacteristics {
  $value: Empty;
}
export interface NumberCharacteristics {
  sectionIdentifier?: Identifier;
  includeCategory?: IdentifierList;
  excludeCategory?: IdentifierList;
}

/**
 * # 7.23
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_OutcomeMinMax
 */
export interface OutcomeMinMax extends OutcomeMinMaxCharacteristics {
  $value: Empty;
}
export interface OutcomeMinMaxCharacteristics {
  sectionIdentifier?: Identifier;
  includeCategory?: IdentifierList;
  excludeCategory?: IdentifierList;
  outcomeIdentifier: Identifier;
  weightIdentifier?: Identifier;
}

/**
 * # 7.24
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Param
 */
export interface Param extends ParamCharacteristics {
  $value: Empty;
}
export interface ParamCharacteristics {
  name: string;
  value: string;
  valuetype: ParamType;
  type?: MimeType;
}

/**
 * # 7.25
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_PrintedVariable
 */
export interface PrintedVariable extends PrintedVariableCharacteristics {
  $value: Empty;
}
export interface PrintedVariableCharacteristics {
  id?: UniqueIdentifier;
  class?: StringList;
  language?: Language;
  label?: NormalizedString;
  baseuri?: Base;
  identifier: Identifier;
  format?: NormalizedString;
  base?: IntegerOrVariableRef;
  index?: IntegerOrVariableRef;
  powerForm?: boolean;
  field?: NormalizedString;
  delimiter?: NormalizedString;
  mappingIndicator?: NormalizedString;
}

/**
 * # 7.26
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_RandomFloat
 */
export interface RandomFloat extends RandomFloatCharacteristics {
  $value: Empty;
}
export interface RandomFloatCharacteristics {
  min?: FloatOrVariableRef;
  max: FloatOrVariableRef;
}

/**
 * # 7.27
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_RandomInteger
 */
export interface RandomInteger extends RandomIntegerCharacteristics {
  $value: Empty;
}
export interface RandomIntegerCharacteristics {
  min?: IntegerOrVariableRef;
  max: IntegerOrVariableRef;
  step?: IntegerOrVariableRef;
}

/**
 * # 7.28
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_StyleSheet
 */
export interface StyleSheet extends StyleSheetCharacteristics {
  $value: Empty;
}
export interface StyleSheetCharacteristics {
  href: AnyURI;
  type: MimeType;
  media?: NormalizedString;
  title?: NormalizedString;
}

/**
 * # 7.29
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_TestVariables
 */
export interface TestVariables extends TestVariablesCharacteristics {
  $value: Empty;
}
export interface TestVariablesCharacteristics {
  sectionIdentifier?: Identifier;
  includeCategory?: IdentifierList;
  excludeCategory?: IdentifierList;
  variableIdentifier: Identifier;
  weightIdentifier?: Identifier;
  baseType?: BaseType;
}

/**
 * # 7.30
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_TimeLimits
 */
export interface TimeLimits extends TimeLimitsCharacteristics {
  $value: Empty;
}
export interface TimeLimitsCharacteristics {
  minTime?: NonNegativeDouble;
  maxTime?: NonNegativeDouble;
  allowLateSubmission?: boolean;
}

/**
 * # 7.31
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_UniqueIdentifier
 */
export interface UniqueIdentifier {
  $value: ID;
}

/**
 * # 7.32
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_UniqueIdentifierRef
 */
export interface UniqueIdentifierRef {
  $value: IDREF;
}

/**
 * # 7.33
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Value
 */
export interface Value extends ValueCharacteristics {
  $value: NormalizedString;
}
export interface ValueCharacteristics {
  fieldIdentifier?: Identifier;
  baseType?: BaseType;
}

/**
 * # 7.34
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Variable
 */
export interface Variable extends VariableCharacteristics {
  $value: Empty;
}
export interface VariableCharacteristics {
  identifier: Identifier;
  weightIdentifier?: Identifier;
}

/**
 * # 7.35
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_VariableMapping
 */
export interface VariableMapping extends VariableMappingCharacteristics {
  $value: Empty;
}
export interface VariableMappingCharacteristics {
  sourceIdentifier: Identifier;
  targetIdentifier: Identifier;
}

/**
 * # 7.36
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_VariableString
 */
export interface VariableString extends VariableStringAttributes {
  $value: string;
}
export interface VariableStringAttributes {
  pattern: string;
}

/**
 * # 7.37
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabDerivedClass_DataModel_Weight
 */
export interface Weight extends WeightCharacteristics {
  $value: Empty;
}
export interface WeightCharacteristics {
  identifier: Identifier;
  value: Double;
}

/**
 * # 8.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ARIALiveValue
 */
export type ARIALiveValue = 'assertive' | 'off' | 'polite';

/**
 * # 8.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ARIAOrientationValue
 */
export type ARIAOrientationValue = 'horizontal' | 'vertical';

/**
 * # 8.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ARIARoleValue
 */
export type ARIARoleValue =
  | 'article'
  | 'button'
  | 'checkbox'
  | 'columnheader'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'directory'
  | 'document'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'math'
  | 'note'
  | 'option'
  | 'presentation'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'tab'
  | 'tablist'
  | 'tabpanel'
  | 'textbox'
  | 'timer'
  | 'toolbar';

/**
 * # 8.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_Align
 */
export type Align = 'center' | 'char' | 'justify' | 'left' | 'right';

/**
 * # 8.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_BaseType
 */
export type BaseType =
  | 'boolean'
  | 'directedPair'
  | 'duration'
  | 'file'
  | 'float'
  | 'identifier'
  | 'integer'
  | 'pair'
  | 'point'
  | 'string'
  | 'uri';

/**
 * # 8.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_CORSSettings
 */
export type CORSSettings = 'anonymous' | 'use-credentials';

/**
 * # 8.7
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_Cardinality
 */
export type Cardinality = 'multiple' | 'ordered' | 'record' | 'single';

/**
 * # 8.8
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_DIR
 */
export type DIR = 'auto' | 'ltr' | 'rtl';

/**
 * # 8.9
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ExternalScored
 */
export type ExternalScored = 'externalMachine' | 'human';

/**
 * # 8.10
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_MathConstantNames
 */
export type MathConstantNames = 'e' | 'pi';

/**
 * # 8.11
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_MathOperatorName
 */
export type MathOperatorName =
  | 'abs'
  | 'acos'
  | 'acot'
  | 'acsc'
  | 'asec'
  | 'asin'
  | 'atan'
  | 'atan2'
  | 'ceil'
  | 'cos'
  | 'cosh'
  | 'cot'
  | 'coth'
  | 'csc'
  | 'csch'
  | 'exp'
  | 'floor'
  | 'ln'
  | 'log'
  | 'sec'
  | 'sech'
  | 'signum'
  | 'sin'
  | 'sinh'
  | 'tan'
  | 'tanh'
  | 'toDegrees'
  | 'toRadians';

/**
 * # 8.12
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_NavigationMode
 */
export type NavigationMode = 'linear' | 'nonlinear';

/**
 * # 8.13
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_Orientation
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * # 8.14
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ParamType
 */
export type ParamType = 'DATA' | 'REF';

/**
 * # 8.15
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_RoundingMode
 */
export type RoundingMode = 'decimalPlaces' | 'significantFigures';

/**
 * # 8.16
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_Shape
 */
export type Shape = 'circle' | 'default' | 'ellipse' | 'poly' | 'rect';

/**
 * # 8.17
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ShowHide
 */
export type ShowHide = 'hide' | 'show';

/**
 * # 8.18
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_StatsOperatorName
 */
export type StatsOperatorName = 'mean' | 'popSD' | 'popVariance' | 'sampleSD' | 'sampleVariance';

/**
 * # 8.19
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_SubmissionMode
 */
export type SubmissionMode = 'individual' | 'simultaneous';

/**
 * # 8.20
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_TableCellScope
 */
export type TableCellScope = 'col' | 'colgroup' | 'row' | 'rowgroup';

/**
 * # 8.21
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_TestFeedbackAccess
 */
export type TestFeedbackAccess = 'atEnd' | 'during';

/**
 * # 8.22
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_TextFormat
 */
export type TextFormat = 'plain' | 'preformatted' | 'xhtml';

/**
 * # 8.23
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_ToleranceMode
 */
export type ToleranceMode = 'absolute' | 'exact' | 'relative';

/**
 * # 8.24
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedClass_DataModel_Valign
 */
export type Valign = 'baseline' | 'bottom' | 'middle' | 'top';

/**
 * # 9.1.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabListClass_DataModel_IdentifierList
 */
export type IdentifierList = NCName[];

/**
 * # 9.1.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabListClass_DataModel_IntegerList
 */
export type IntegerList = Int[];

/**
 * # 9.1.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabListClass_DataModel_MimeTypeList
 */
export type MimeTypeList = MimeType[];

/**
 * # 9.1.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabListClass_DataModel_StringList
 */
export type StringList = string[];

/**
 * # 9.1.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabListClass_DataModel_ToleranceList
 */
export type ToleranceList = (string | Double)[];

/**
 * # 9.2.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabEnumeratedListClass_DataModel_View
 */
export type View = 'author' | 'candidate' | 'proctor' | 'scorer' | 'testConstructor' | 'tutor';

/**
 * # 9.3.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabUnionClass_DataModel_FloatOrVariableRef
 */
export type FloatOrVariableRef = Double | VariableString;

/**
 * # 9.3.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabUnionClass_DataModel_IntOrIdentifier
 */
export type IntOrIdentifier = NCName | Int;

/**
 * # 9.3.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabUnionClass_DataModel_IntegerOrVariableRef
 */
export type IntegerOrVariableRef = Integer | VariableString;

/**
 * # 9.3.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabUnionClass_DataModel_StringOrVariableRef
 */
export type StringOrVariableRef = string | EncVariableString;

/**
 * # 9.4.1
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_APIPAccessibility
 */
export interface APIPAccessibility {}

/**
 * # 9.4.2
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_HTML5
 */
export interface HTML5 {}

/**
 * # 9.4.3
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_Include
 */
export interface Include {}

/**
 * # 9.4.4
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_MathML2
 */
export interface MathML2 {}

/**
 * # 9.4.5
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_MathML3
 */
export interface MathML3 {}

/**
 * # 9.4.6
 * https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html#TabImportClass_DataModel_SSMLv1p1
 */
export interface SSMLv1p1 {}

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
