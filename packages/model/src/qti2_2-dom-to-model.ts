import type * as model from './qti2_2';

interface DomToModelFn<T> {
  (el: Element): T;
}
interface ElementMapping {
  [key: string]: DomToModelFn<any>;
}

// 4.5
export function outcomeDeclarationDomToModel(el: Element): model.OutcomeDeclaration {
  const result: model.OutcomeDeclaration = {
    $children: mapElements(getChildElements(el), outcomeDeclarationDomToModel.childrenMapping),
    identifier: {$value: el.getAttribute('identifier') || ''},
    cardinality: (el.getAttribute('cardinality') || 'single') as model.Cardinality,
  };
  if (el.hasAttribute('baseType')) result.baseType = el.getAttribute('baseType') as model.BaseType;
  // TODO: view
  // TODO: interpretation
  // TODO: longInterpretation
  // TODO: normalMaximum
  // TODO: normalMinimum
  // TODO: masteryValue
  // TODO: externalScored
  // TODO: variableIdentifierRef
  return result;
}
outcomeDeclarationDomToModel.childrenMapping = {
  defaultValue: defaultValueDomToModel,
};

// 4.6
export function responseProcessingDomToModel(el: Element): model.ResponseProcessing {
  const result: model.ResponseProcessing = {
    $children: mapElements(
      getChildElements(el),
      responseProcessingDomToModel.childrenMapping,
      responseProcessingDomToModel.groupMapping
    ),
  };
  if (el.hasAttribute('template')) result.template = el.getAttribute('template') || '';
  if (el.hasAttribute('templateLocation')) result.templateLocation = el.getAttribute('templateLocation') || '';
  return result;
}
responseProcessingDomToModel.childrenMapping = {
  responseRuleGroup: responseRuleGroupDomToModel,
};
responseProcessingDomToModel.groupMapping = {
  ...toGroupMapping(getResponseRuleGroupElementMapping(), 'responseRuleGroup'),
};

// 5.20
export function correctResponseDomToModel(el: Element): model.CorrectResponse {
  const result: model.CorrectResponse = {
    $children: mapElements(getChildElements(el), correctResponseDomToModel.childrenMapping),
  };
  if (el.hasAttribute('interpretation')) result.interpretation = el.getAttribute('interpretation') || '';
  return result;
}
correctResponseDomToModel.childrenMapping = {
  value: valueDomToModel,
};

// 5.26
export function defaultValueDomToModel(el: Element): model.DefaultValue {
  const result: model.DefaultValue = {
    $children: mapElements(getChildElements(el), defaultValueDomToModel.childrenMapping),
  };
  if (el.hasAttribute('interpretation')) result.interpretation = el.getAttribute('interpretation') || '';
  return result;
}
defaultValueDomToModel.childrenMapping = {
  value: valueDomToModel,
};

// 5.30
export function equalDomToModel(el: Element): model.Equal {
  const result: model.Equal = {
    $children: mapElements(getChildElements(el), equalDomToModel.childrenMapping, equalDomToModel.groupMapping),
  };
  if (el.hasAttribute('toleranceMode')) result.toleranceMode = el.getAttribute('toleranceMode') as model.ToleranceMode;
  // TODO: tolerance
  // TODO: includeLowerBound
  // TODO: includeUpperBound
  return result;
}
equalDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};
equalDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'logic'),
};

// 5.59
export function logic0toManyDomToModel(el: Element): model.Logic0toMany {
  const result: model.Logic0toMany = {
    $children: mapElements(
      getChildElements(el),
      logic0toManyDomToModel.childrenMapping,
      logic0toManyDomToModel.groupMapping
    ),
  };
  return result;
}
logic0toManyDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};
logic0toManyDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'logic'),
};

// 5.60
export function logic1toManyDomToModel(el: Element): model.Logic1toMany {
  const result: model.Logic1toMany = {
    $children: mapElements(
      getChildElements(el),
      logic1toManyDomToModel.childrenMapping,
      logic1toManyDomToModel.groupMapping
    ),
  };
  return result;
}
logic1toManyDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};
logic1toManyDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'logic'),
};

// 5.61
export function logicPairDomToModel(el: Element): model.LogicPair {
  const result: model.LogicPair = {
    $children: mapElements(getChildElements(el), logicPairDomToModel.childrenMapping, logicPairDomToModel.groupMapping),
  };
  return result;
}
logicPairDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};
logicPairDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'logic'),
};

// 5.62
export function logicSingleDomToModel(el: Element): model.LogicSingle {
  const result: model.LogicSingle = {
    $children: mapElements(
      getChildElements(el),
      logicSingleDomToModel.childrenMapping,
      logicSingleDomToModel.groupMapping
    ),
  };
  return result;
}
logicSingleDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};
logicSingleDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'logic'),
};

// 5.64
export function mappingDomToModel(el: Element): model.Mapping {
  const result: model.Mapping = {
    $children: mapElements(getChildElements(el), mappingDomToModel.childrenMapping),
  };
  if (el.hasAttribute('lowerBound')) result.lowerBound = +(el.getAttribute('lowerBound') || 0);
  if (el.hasAttribute('upperBound')) result.upperBound = +(el.getAttribute('upperBound') || 0);
  if (el.hasAttribute('defaultValue')) result.defaultValue = +(el.getAttribute('defaultValue') || 0);
  return result;
}
mappingDomToModel.childrenMapping = {
  mapEntry: mapEntryDomToModel,
};

// 5.70
export function numericLogic1toManyDomToModel(el: Element): model.NumericLogic1toMany {
  const result: model.NumericLogic1toMany = {
    $children: mapElements(
      getChildElements(el),
      numericLogic1toManyDomToModel.childrenMapping,
      numericLogic1toManyDomToModel.groupMapping
    ),
  };
  return result;
}
numericLogic1toManyDomToModel.childrenMapping = {
  logic: numericExpressionGroupDomToModel,
};
numericLogic1toManyDomToModel.groupMapping = {
  ...toGroupMapping(getNumericExpressionGroupElementMapping(), 'logic'),
};

// 5.86
export function responseConditionDomToModel(el: Element): model.ResponseCondition {
  const result: model.ResponseCondition = {
    $children: mapElements(getChildElements(el), responseConditionDomToModel.childrenMapping),
  };
  return result;
}
responseConditionDomToModel.childrenMapping = {
  responseIf: responseIfDomToModel,
  responseElseIf: responseIfDomToModel,
  responseElse: responseElseDomToModel,
};

// 5.87
export function responseDeclarationDomToModel(el: Element): model.ResponseDeclaration {
  const result: model.ResponseDeclaration = {
    $children: mapElements(getChildElements(el), responseDeclarationDomToModel.childrenMapping),
    identifier: {$value: el.getAttribute('identifier') || ''},
    cardinality: (el.getAttribute('cardinality') || 'multiple') as model.Cardinality,
  };
  if (el.hasAttribute('baseType')) result.baseType = el.getAttribute('baseType') as model.BaseType;
  return result;
}
responseDeclarationDomToModel.childrenMapping = {
  // TODO: defaultValue
  correctResponse: correctResponseDomToModel,
  mapping: mappingDomToModel,
  // TODO: areaMapping
};

// 5.88
export function responseElseDomToModel(el: Element): model.ResponseElse {
  const result: model.ResponseElse = {
    $children: mapElements(
      getChildElements(el),
      responseElseDomToModel.childrenMapping,
      responseElseDomToModel.groupMapping
    ),
  };
  return result;
}
responseElseDomToModel.childrenMapping = {
  responseRuleGroup: responseRuleGroupDomToModel,
};
responseElseDomToModel.groupMapping = {
  ...toGroupMapping(getResponseRuleGroupElementMapping(), 'responseRuleGroup'),
};

// 5.89
export function responseIfDomToModel(el: Element): model.ResponseIf {
  const result: model.ResponseIf = {
    $children: mapElements(
      getChildElements(el),
      responseIfDomToModel.childrenMapping,
      responseIfDomToModel.groupMapping
    ),
  };
  return result;
}
responseIfDomToModel.childrenMapping = {
  expressionGroup: expressionGroupDomToModel,
  responseRuleGroup: responseRuleGroupDomToModel,
};
responseIfDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'expressionGroup'),
  ...toGroupMapping(getResponseRuleGroupElementMapping(), 'responseRuleGroup'),
};

// 5.97
export function setValueDomToModel(el: Element): model.SetValue {
  const result: model.SetValue = {
    $children: mapElements(getChildElements(el), setValueDomToModel.childrenMapping, setValueDomToModel.groupMapping),
    identifier: {$value: el.getAttribute('identifier') || ''},
  };
  return result;
}
setValueDomToModel.childrenMapping = {
  expressionGroup: expressionGroupDomToModel,
};
setValueDomToModel.groupMapping = {
  ...toGroupMapping(getExpressionGroupElementMapping(), 'expressionGroup'),
};

// 6.7
export function expressionGroupDomToModel(el: Element): model.ExpressionGroup {
  const result: model.ExpressionGroup = {
    $selection: selectElement(el, expressionGroupDomToModel.elementMapping)!,
  };
  return result;
}
expressionGroupDomToModel.elementMapping = getExpressionGroupElementMapping();
function getExpressionGroupElementMapping() {
  return {
    and: logic1toManyDomToModel,
    gt: logicPairDomToModel,
    not: logicSingleDomToModel,
    lt: logicPairDomToModel,
    gte: logicPairDomToModel,
    lte: logicPairDomToModel,
    or: logic1toManyDomToModel,
    sum: numericLogic1toManyDomToModel,
    // TODO: durationLT
    // TODO: durationGTE
    // TODO: subtract
    // TODO: divide
    multiple: logic0toManyDomToModel,
    // TODO: ordered
    // TODO: customOperator
    // TODO: random
    // TODO: numberIncorrect
    // TODO: numberCorrect
    // TODO: numberPresented
    // TODO: numberResponded
    // TODO: numberSelected
    // TODO: substring
    // TODO: equalRounded
    // TODO: null
    // TODO: delete
    match: logicPairDomToModel,
    // TODO: index
    // TODO: power
    equal: equalDomToModel,
    // TODO: contains
    // TODO: containerSize
    correct: correctDomToModel,
    // TODO: default
    // TODO: anyN
    // TODO: integerDivide
    // TODO: integerModulus
    isNull: logicSingleDomToModel,
    // TODO: member
    // TODO: product
    // TODO: round
    // TODO: truncate
    // TODO: fieldValue
    // TODO: randomInteger
    // TODO: randomFloat
    variable: variableDomToModel,
    // TODO: outcomeMinimum
    // TODO: outcomeMaximum
    // TODO: testVariables
    // TODO: integerToFloat
    // TODO: inside
    baseValue: baseValueDomToModel,
    // TODO: patternMatch
    mapResponsePoint: mapResponseDomToModel,
    mapResponse: mapResponseDomToModel,
    // TODO: stringMatch
    // TODO: repeat
    // TODO: roundTo
    // TODO: lcm
    // TODO: gcd
    // TODO: min
    // TODO: max
    // TODO: mathConstant
    // TODO: statsOperator
    // TODO: mathOperator
  };
}

// 6.22
export function numericExpressionGroupDomToModel(el: Element): model.NumericExpressionGroup {
  const result: model.NumericExpressionGroup = {
    $selection: selectElement(el, numericExpressionGroupDomToModel.elementMapping)!,
  };
  return result;
}
numericExpressionGroupDomToModel.elementMapping = getNumericExpressionGroupElementMapping();
function getNumericExpressionGroupElementMapping() {
  return {
    sum: numericLogic1toManyDomToModel,
    subtract: logicPairDomToModel,
    divide: logicPairDomToModel,
    multiple: logic0toManyDomToModel,
    // TODO: ordered
    // TODO: customOperator
    // TODO: random
    // TODO: numberIncorrect
    // TODO: numberCorrect
    // TODO: numberPresented
    // TODO: numberResponded
    // TODO: numberSelected
    // TODO: null
    // TODO: delete
    // TODO: index
    // TODO: power
    // TODO: containerSize
    correct: correctDomToModel,
    // TODO: default
    // TODO: integerDivide
    // TODO: integerModulus
    // TODO: product
    // TODO: round
    // TODO: truncate
    // TODO: fieldValue
    // TODO: randomInteger
    variable: variableDomToModel,
    // TODO: outcomeMinimum
    // TODO: outcomeMaximum
    // TODO: testVariables
    // TODO: integerToFloat
    baseValue: baseValueDomToModel,
    // TODO: mapResponsePoint
    mapResponse: mapResponseDomToModel,
    // TODO: repeat
    // TODO: roundTo
    // TODO: lcm
    // TODO: gcd
    // TODO: min
    // TODO: max
    // TODO: mathConstant
    // TODO: statsOperator
    // TODO: mathOperator
    // TODO: randomFloat
  };
}

// 6.26
export function responseRuleGroupDomToModel(el: Element): model.ResponseRuleGroup {
  const result: model.ResponseRuleGroup = {
    $selection: selectElement(el, responseRuleGroupDomToModel.elementMapping)!,
  };
  return result;
}
responseRuleGroupDomToModel.elementMapping = getResponseRuleGroupElementMapping();
function getResponseRuleGroupElementMapping() {
  return {
    // TODO: include
    responseCondition: responseConditionDomToModel,
    // TODO: responseProcessingFragment
    setOutcomeValue: setValueDomToModel,
    // TODO: exitResponse
    // TODO: lookupOutcomeValue
  };
}

// 7.6
export function baseValueDomToModel(el: Element): model.BaseValue {
  const result: model.BaseValue = {
    $value: el.textContent || '',
    baseType: el.getAttribute('baseType') as model.BaseType,
  };
  return result;
}

// 7.8
export function correctDomToModel(el: Element): model.Correct {
  const result: model.Correct = {
    $value: undefined,
    identifier: {$value: el.getAttribute('identifier') || ''},
  };
  return result;
}

export function mapEntryDomToModel(el: Element): model.MapEntry {
  const result: model.MapEntry = {
    $value: undefined,
    mapKey: el.getAttribute('mapKey') || '',
    mappedValue: +(el.getAttribute('mappedValue') || 0),
  };
  if (el.hasAttribute('caseSensitive')) result.caseSensitive = el.getAttribute('caseSensitive') === 'true';
  return result;
}

// 7.17
export function mapResponseDomToModel(el: Element): model.MapResponse {
  const result: model.MapResponse = {
    $value: undefined,
    identifier: {$value: el.getAttribute('identifier') || ''},
  };
  return result;
}

// 7.33
export function valueDomToModel(el: Element): model.Value {
  const result: model.Value = {
    $value: el.textContent || '',
  };
  if (el.hasAttribute('fieldIdentifier')) result.fieldIdentifier = {$value: el.getAttribute('fieldIdentifier') || ''};
  if (el.hasAttribute('baseType')) result.baseType = el.getAttribute('baseType') as model.BaseType;
  return result;
}

// 7.34
export function variableDomToModel(el: Element): model.Variable {
  const result: model.Variable = {
    $value: undefined,
    identifier: {$value: el.getAttribute('identifier') || ''},
  };
  if (el.hasAttribute('weightIdentifier')) result.identifier = {$value: el.getAttribute('weightIdentifier') || ''};
  return result;
}

const elementNode = 1 as const; // Node.ELEMENT_NODE
function getChildElements(el: Element): Iterable<Element> {
  // `@xmldom/xmldom` doesn't support `el.children`
  if (el.children) return el.children;
  const result: Element[] = [];
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (child.nodeType === elementNode) result.push(child as Element);
  }
  return result;
}

function mapElements<TChildren extends [string, any][] = [string, any][]>(
  elements: Iterable<Element>,
  table: {[tagName: string]: (el: Element) => any},
  groupMapping?: {[tagName: string]: string}
): TChildren {
  return Array.from(elements)
    .map(el => {
      const tagName = groupMapping?.[el.tagName] ?? el.tagName;
      if (!(tagName in table)) return;
      return [tagName, table[tagName](el)];
    })
    .filter(Boolean) as unknown as TChildren;
}

function selectElement<TChild extends [string, any] = [string, any]>(
  element: Element,
  table: {[tagName: string]: (el: Element) => any}
): TChild | undefined {
  if (!(element.tagName in table)) return;
  return [element.tagName, table[element.tagName](element)] as TChild;
}

function toGroupMapping<T extends ElementMapping, U extends string>(
  elementMapping: T,
  groupKey: U
): {[key in keyof T]: U} {
  const keys = Object.keys(elementMapping) as (keyof T)[];
  return Object.fromEntries(keys.map(key => [key, groupKey])) as {[key in keyof T]: U};
}
