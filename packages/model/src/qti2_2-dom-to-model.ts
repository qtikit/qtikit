import type * as model from './qti2_2';

// 4.5
export function outcomeDeclarationDomToModel(el: Element): model.OutcomeDeclaration {
  const result: model.OutcomeDeclaration = {
    $children: mapElements(el.children, outcomeDeclarationDomToModel.childrenMapping),
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
    $children: mapElements(el.children, responseProcessingDomToModel.childrenMapping),
  };
  // TODO: template
  // TODO: templateLocation
  return result;
}
responseProcessingDomToModel.childrenMapping = {
  responseRuleGroup: responseRuleGroupDomToModel,
};

// 5.20
export function correctResponseDomToModel(el: Element): model.CorrectResponse {
  const result: model.CorrectResponse = {
    $children: mapElements(el.children, correctResponseDomToModel.childrenMapping),
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
    $children: mapElements(el.children, defaultValueDomToModel.childrenMapping),
  };
  if (el.hasAttribute('interpretation')) result.interpretation = el.getAttribute('interpretation') || '';
  return result;
}
defaultValueDomToModel.childrenMapping = {
  value: valueDomToModel,
};

// 5.61
export function logicPairDomToModel(el: Element): model.LogicPair {
  const result: model.LogicPair = {
    $children: mapElements(el.children, logicPairDomToModel.childrenMapping),
  };
  return result;
}
logicPairDomToModel.childrenMapping = {
  logic: expressionGroupDomToModel,
};

// 5.70
export function numericLogic1toManyDomToModel(el: Element): model.NumericLogic1toMany {
  const result: model.NumericLogic1toMany = {
    $children: mapElements(el.children, numericLogic1toManyDomToModel.childrenMapping),
  };
  return result;
}
numericLogic1toManyDomToModel.childrenMapping = {
  logic: numericExpressionGroupDomToModel,
};

// 5.86
export function responseConditionDomToModel(el: Element): model.ResponseCondition {
  const result: model.ResponseCondition = {
    $children: mapElements(el.children, responseConditionDomToModel.childrenMapping),
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
    $children: mapElements(el.children, responseDeclarationDomToModel.childrenMapping),
    identifier: {$value: el.getAttribute('identifier') || ''},
    cardinality: (el.getAttribute('cardinality') || 'multiple') as model.Cardinality,
  };
  if (el.hasAttribute('baseType')) result.baseType = el.getAttribute('baseType') as model.BaseType;
  return result;
}
responseDeclarationDomToModel.childrenMapping = {
  // TODO: defaultValue
  correctResponse: correctResponseDomToModel,
  // TODO: mapping
  // TODO: areaMapping
};

// 5.88
export function responseElseDomToModel(el: Element): model.ResponseElse {
  const result: model.ResponseElse = {
    $children: mapElements(el.children, responseElseDomToModel.childrenMapping),
  };
  return result;
}
responseElseDomToModel.childrenMapping = {
  responseRuleGroup: responseRuleGroupDomToModel,
};

// 5.89
export function responseIfDomToModel(el: Element): model.ResponseIf {
  const result: model.ResponseIf = {
    $children: mapElements(el.children, responseIfDomToModel.childrenMapping),
  };
  return result;
}
responseIfDomToModel.childrenMapping = {
  expressionGroup: expressionGroupDomToModel,
  responseRuleGroup: responseRuleGroupDomToModel,
};

// 5.97
export function setValueDomToModel(el: Element): model.SetValue {
  const result: model.SetValue = {
    $children: mapElements(el.children, setValueDomToModel.childrenMapping),
    identifier: {$value: el.getAttribute('identifier') || ''},
  };
  return result;
}
setValueDomToModel.childrenMapping = {
  expressionGroup: expressionGroupDomToModel,
};

// 6.7
export function expressionGroupDomToModel(el: Element): model.ExpressionGroup {
  const result: model.ExpressionGroup = {
    $selection: selectElement(el, expressionGroupDomToModel.elementMapping)!,
  };
  return result;
}
expressionGroupDomToModel.elementMapping = {
  // TODO: and
  // TODO: gt
  // TODO: not
  // TODO: lt
  // TODO: gte
  // TODO: lte
  // TODO: or
  sum: numericLogic1toManyDomToModel,
  // TODO: durationLT
  // TODO: durationGTE
  // TODO: subtract
  // TODO: divide
  // TODO: multiple
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
  // TODO: equal
  // TODO: contains
  // TODO: containerSize
  // TODO: correct
  // TODO: default
  // TODO: anyN
  // TODO: integerDivide
  // TODO: integerModulus
  // TODO: isNull
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
  // TODO: mapResponsePoint
  // TODO: mapResponse
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

// 6.22
export function numericExpressionGroupDomToModel(el: Element): model.NumericExpressionGroup {
  const result: model.NumericExpressionGroup = {
    $selection: selectElement(el, numericExpressionGroupDomToModel.elementMapping)!,
  };
  return result;
}
numericExpressionGroupDomToModel.elementMapping = {
  sum: numericLogic1toManyDomToModel,
  subtract: logicPairDomToModel,
  divide: logicPairDomToModel,
  // TODO: multiple
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
  // TODO: correct
  // TODO: default
  // TODO: integerDivide
  // TODO: integerModulus
  // TODO: product
  // TODO: round
  // TODO: truncate
  // TODO: fieldValue
  // TODO: randomInteger
  // TODO: variable
  // TODO: outcomeMinimum
  // TODO: outcomeMaximum
  // TODO: testVariables
  // TODO: integerToFloat
  // TODO: baseValue
  // TODO: mapResponsePoint
  // TODO: mapResponse
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

// 6.26
export function responseRuleGroupDomToModel(el: Element): model.ResponseRuleGroup {
  const result: model.ResponseRuleGroup = {
    $selection: selectElement(el, responseRuleGroupDomToModel.elementMapping)!,
  };
  return result;
}
responseRuleGroupDomToModel.elementMapping = {
  // TODO: include
  responseCondition: responseConditionDomToModel,
  // TODO: responseProcessingFragment
  setOutcomeValue: setValueDomToModel,
  // TODO: exitResponse
  // TODO: lookupOutcomeValue
};

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

function mapElements<TChildren extends [string, any][] = [string, any][]>(
  elements: Iterable<Element>,
  table: {[tagName: string]: (el: Element) => any}
): TChildren {
  return Array.from(elements)
    .map(el => {
      if (!(el.tagName in table)) return;
      return [el.tagName, table[el.tagName](el)];
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
