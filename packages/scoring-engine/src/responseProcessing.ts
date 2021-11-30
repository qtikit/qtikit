import type {UserInput} from '@qtikit/model/lib/user-input';
import type * as model from '@qtikit/model/lib/qti2_2';

import {OutcomeValues} from '.';
import {expandRptemplates} from './rptemplates';

export interface ResponseProcessingConfig {
  responseDeclarations?: model.ResponseDeclaration[];
  outcomeDeclarations?: model.OutcomeDeclaration[];
  templateDeclarations?: model.TemplateDeclaration[];
  templateProcessing?: model.TemplateProcessing;
  responseProcessing?: model.ResponseProcessing;
}

export interface ResponseProcessingResult {
  score: number;
  outcomeValues: OutcomeValues;
}

export default function responseProcessing(
  config: ResponseProcessingConfig,
  input: UserInput
): ResponseProcessingResult {
  const outcomeValues: OutcomeValues = {};
  for (const outcomeDeclaration of config.outcomeDeclarations || []) {
    const identifier = outcomeDeclaration.identifier.$value;
    const defaultValue = getDefaultValue(outcomeDeclaration);
    outcomeValues[identifier] = defaultValue;
  }
  if (config.responseProcessing) {
    evalResponseProcessing(expandRptemplates(config.responseProcessing), {config, input, outcomeValues});
  }
  const score = Number(outcomeValues.SCORE?.[0] || 0);
  return {score, outcomeValues};
}

interface Env {
  config: ResponseProcessingConfig;
  input: UserInput;
  outcomeValues: OutcomeValues;
}

type Value = string[];

// 4.6
function evalResponseProcessing(node: model.ResponseProcessing, env: Env): void {
  for (const child of node.$children) evalResponseRuleGroup(child[1], env);
}

// 5.86
function evalResponseCondition(node: model.ResponseCondition, env: Env): void {
  for (const child of node.$children) {
    switch (child[0]) {
      case 'responseIf':
      case 'responseElseIf': {
        const ifNode = child[1];
        const condNode = ifNode.$children[0][1] as model.ExpressionGroup;
        const thenNode = ifNode.$children[1][1] as model.ResponseRuleGroup;
        if (evalExpressionGroup(condNode, env)[0] === 'true') return evalResponseRuleGroup(thenNode, env);
        break;
      }
      case 'responseElse': {
        const elseNode = child[1];
        const thenNode = elseNode.$children[0][1];
        return evalResponseRuleGroup(thenNode, env);
      }
    }
  }
}

// 6.7
function evalExpressionGroup(node: model.ExpressionGroup, env: Env): Value {
  const {$selection} = node;
  switch ($selection[0]) {
    // TODO: and
    // TODO: gt
    // TODO: not
    // TODO: lt
    // TODO: gte
    // TODO: lte
    // TODO: or
    // TODO: sum
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
    case 'match': {
      const matchNode = $selection[1];
      const lhs = evalExpressionGroup(matchNode.$children[0][1], env);
      const rhs = evalExpressionGroup(matchNode.$children[1][1], env);
      return [String(lhs.length === rhs.length && lhs.every((lhsValue, index) => lhsValue === rhs[index]))];
    }
    // TODO: index
    // TODO: power
    // TODO: equal
    // TODO: contains
    // TODO: containerSize
    case 'correct': {
      const correctNode = $selection[1];
      return getCorrectValue(findResponseDeclaration(env.config.responseDeclarations, correctNode.identifier.$value));
    }
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
    case 'variable': {
      const variableNode = $selection[1];
      return env.input[variableNode.identifier.$value] || [];
    }
    // TODO: outcomeMinimum
    // TODO: outcomeMaximum
    // TODO: testVariables
    // TODO: integerToFloat
    // TODO: inside
    case 'baseValue': {
      const baseValueNode = $selection[1];
      return [baseValueNode.$value];
    }
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
  }
  return [];
}

// 6.26
function evalResponseRuleGroup(node: model.ResponseRuleGroup, env: Env): void {
  const {$selection} = node;
  switch ($selection[0]) {
    // TODO: include
    case 'responseCondition':
      evalResponseCondition($selection[1], env);
      break;
    // TODO: responseProcessingFragment
    case 'setOutcomeValue': {
      const setOutcomeValueNode = $selection[1];
      const identifier = setOutcomeValueNode.identifier.$value;
      const value = evalExpressionGroup(setOutcomeValueNode.$children[0][1], env);
      env.outcomeValues[identifier] = value;
    }
    // TODO: exitResponse
    // TODO: lookupOutcomeValue
  }
}

function findChildByType<TType extends string, TChild extends [string, any]>(
  children: TChild[],
  type: TType
): Extract<TChild, [TType, any]>[1] | undefined {
  return filterChildrenByType(children, type)[0];
}

function filterChildrenByType<TType extends string, TChild extends [string, any]>(
  children: TChild[],
  type: TType
): Extract<TChild, [TType, any]>[1][] {
  return children.filter(([key]) => key === type).map(([, value]) => value);
}

function getDefaultValue(declaration?: model.ResponseDeclaration | model.OutcomeDeclaration): Value {
  if (!declaration) return [];
  const defaultValue = findChildByType(declaration.$children as any, 'defaultValue') as any;
  return defaultValue ? getValue(defaultValue.$children) : [];
}

function getCorrectValue(declaration?: model.ResponseDeclaration): Value {
  if (!declaration) return [];
  const correctResponse = findChildByType(declaration.$children as any, 'correctResponse') as any;
  return correctResponse ? getValue(correctResponse.$children) : [];
}

function getValue(values: ['value', model.Value][]) {
  return values.map(([, {$value}]) => $value);
}

function findResponseDeclaration(
  responseDeclarations: model.ResponseDeclaration[] | undefined,
  identifier: string
): model.ResponseDeclaration | undefined {
  return responseDeclarations?.find(({identifier: {$value}}) => $value === identifier);
}
