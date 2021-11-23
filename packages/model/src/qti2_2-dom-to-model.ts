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

// 7.33
export function valueDomToModel(el: Element): model.Value {
  const result: model.Value = {
    $value: el.textContent || '',
  };
  if (el.hasAttribute('fieldIdentifier')) result.fieldIdentifier = {$value: el.getAttribute('fieldIdentifier') || ''};
  if (el.hasAttribute('baseType')) result.baseType = el.getAttribute('baseType') as model.BaseType;
  return result;
}

function mapElements<TChildren extends [string, any][] = [string, any][]>(
  elements: Iterable<Element>,
  table: {[tagName: string]: (el: Element) => any}
): TChildren {
  return Array.from(elements)
    .map(el => {
      if (el.tagName in table) [el.tagName, table[el.tagName](el)];
      return;
    })
    .filter(Boolean) as unknown as TChildren;
}
