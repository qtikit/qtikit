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
        const body = ifNode.$children.slice(1).map(([, node]) => node) as model.ResponseRuleGroup[];
        if (evalExpressionGroup(condNode, env)[0] === 'true') {
          for (const childNode of body) evalResponseRuleGroup(childNode, env);
          return;
        }
        break;
      }
      case 'responseElse': {
        const elseNode = child[1];
        const body = elseNode.$children.map(([, node]) => node);
        for (const childNode of body) evalResponseRuleGroup(childNode, env);
        return;
      }
    }
  }
}

// 6.7
function evalExpressionGroup(node: model.ExpressionGroup, env: Env): Value {
  const {$selection} = node;
  switch ($selection[0]) {
    case 'and': {
      const andNode = $selection[1];
      const values = andNode.$children.map(([, expression]) => evalExpressionGroup(expression, env));
      if (values.some(value => value[0] === 'false')) return ['false'];
      if (values.some(value => value.length < 1)) return [];
      return ['true'];
    }
    case 'gt': {
      const gtNode = $selection[1];
      const lhs = evalExpressionGroup(gtNode.$children[0][1], env);
      const rhs = evalExpressionGroup(gtNode.$children[1][1], env);
      if (lhs.length < 1 || rhs.length < 1) return [];
      const lhsValue = +lhs[0];
      const rhsValue = +rhs[0];
      return [String(lhsValue > rhsValue)];
    }
    // TODO: not
    case 'lt': {
      const ltNode = $selection[1];
      const lhs = evalExpressionGroup(ltNode.$children[0][1], env);
      const rhs = evalExpressionGroup(ltNode.$children[1][1], env);
      if (lhs.length < 1 || rhs.length < 1) return [];
      const lhsValue = +lhs[0];
      const rhsValue = +rhs[0];
      return [String(lhsValue < rhsValue)];
    }
    case 'gte': {
      const gteNode = $selection[1];
      const lhs = evalExpressionGroup(gteNode.$children[0][1], env);
      const rhs = evalExpressionGroup(gteNode.$children[1][1], env);
      if (lhs.length < 1 || rhs.length < 1) return [];
      const lhsValue = +lhs[0];
      const rhsValue = +rhs[0];
      return [String(lhsValue >= rhsValue)];
    }
    case 'lte': {
      const lteNode = $selection[1];
      const lhs = evalExpressionGroup(lteNode.$children[0][1], env);
      const rhs = evalExpressionGroup(lteNode.$children[1][1], env);
      if (lhs.length < 1 || rhs.length < 1) return [];
      const lhsValue = +lhs[0];
      const rhsValue = +rhs[0];
      return [String(lhsValue <= rhsValue)];
    }
    // TODO: or
    case 'sum': {
      const sumNode = $selection[1];
      return [
        String(
          multiple(sumNode.$children, env)
            .map(Number)
            .reduce((a, b) => a + b, 0)
        ),
      ];
    }
    // TODO: durationLT
    // TODO: durationGTE
    // TODO: subtract
    // TODO: divide
    case 'multiple': {
      const multipleNode = $selection[1];
      return multiple(multipleNode.$children, env);
    }
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
    case 'equal': {
      const equalNode = $selection[1];
      const lhs = evalExpressionGroup(equalNode.$children[0][1], env);
      const rhs = evalExpressionGroup(equalNode.$children[1][1], env);
      if (lhs.length < 1 || rhs.length < 1) return [];
      const lhsValue = +lhs[0];
      const rhsValue = +rhs[0];
      const {toleranceMode = 'exact'} = equalNode;
      if (toleranceMode === 'exact') return [String(lhsValue === rhsValue)];
      // TODO: handle other tolerance modes
      return [String(lhsValue === rhsValue)];
    }
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
    case 'isNull': {
      const isNullNode = $selection[1];
      const value = evalExpressionGroup(isNullNode.$children[0][1], env);
      return [String(value.length < 1)];
    }
    // TODO: member
    // TODO: product
    // TODO: round
    // TODO: truncate
    // TODO: fieldValue
    // TODO: randomInteger
    // TODO: randomFloat
    case 'variable': {
      const variableNode = $selection[1];
      const identifier = variableNode.identifier.$value;
      return env.input[identifier] || env.outcomeValues[identifier] || [];
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
    case 'mapResponse': {
      const mapResponseNode = $selection[1];
      const identifier = mapResponseNode.identifier.$value;
      const mapping = getMapping(findResponseDeclaration(env.config.responseDeclarations, identifier));
      if (!mapping) return [];
      const {defaultValue, lowerBound, upperBound} = mapping;
      const mapEntries = filterChildrenByType(mapping.$children, 'mapEntry');
      const caseSensitiveInput = env.input[identifier] || [];
      const lowercaseInput = caseSensitiveInput.map(value => value.toLowerCase());
      const matchedValues: number[] = [];
      for (const mapEntry of mapEntries) {
        const {mapKey, mappedValue, caseSensitive} = mapEntry;
        const key = caseSensitive ? mapKey : mapKey.toLowerCase();
        const input = caseSensitive ? caseSensitiveInput : lowercaseInput;
        if (input.includes(key)) matchedValues.push(mappedValue);
      }
      const sum = matchedValues.length < 1 ? defaultValue || 0 : matchedValues.reduce((a, b) => a + b, 0);
      return [String(Math.max(lowerBound ?? -Infinity, Math.min(upperBound ?? Infinity, sum)))];
    }
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

function getMapping(declaration?: model.ResponseDeclaration): model.Mapping | undefined {
  return declaration && (findChildByType(declaration.$children as any, 'mapping') as any);
}

function getValue(values: ['value', model.Value][]) {
  return values.map(([, {$value}]) => $value);
}

function multiple(children: ['logic', model.ExpressionGroup][], env: Env) {
  return children.flatMap(([, expression]) => evalExpressionGroup(expression, env));
}

function findResponseDeclaration(
  responseDeclarations: model.ResponseDeclaration[] | undefined,
  identifier: string
): model.ResponseDeclaration | undefined {
  return responseDeclarations?.find(({identifier: {$value}}) => $value === identifier);
}
